import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const courseSchema = z.object({
  title: z.string().trim().min(2).max(200),
  description: z.string().max(2000).optional().or(z.literal("")),
  duration: z.string().max(100).optional().or(z.literal("")),
  format: z.string().max(100).optional().or(z.literal("")),
  fee: z.coerce.number().int().min(0),
  next_batch_date: z.string().optional().or(z.literal("")),
  is_active: z.boolean(),
});

type CourseForm = z.infer<typeof courseSchema>;

interface Course extends CourseForm {
  id: string;
}

const emptyDefaults: CourseForm = {
  title: "",
  description: "",
  duration: "",
  format: "",
  fee: 0,
  next_batch_date: "",
  is_active: true,
};

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Course | null>(null);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<CourseForm>({
    resolver: zodResolver(courseSchema),
    defaultValues: emptyDefaults,
  });

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setCourses((data ?? []) as Course[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing(null);
    form.reset(emptyDefaults);
    setOpen(true);
  };

  const openEdit = (c: Course) => {
    setEditing(c);
    form.reset({
      title: c.title,
      description: c.description ?? "",
      duration: c.duration ?? "",
      format: c.format ?? "",
      fee: c.fee,
      next_batch_date: c.next_batch_date ?? "",
      is_active: c.is_active,
    });
    setOpen(true);
  };

  const onSubmit = async (data: CourseForm) => {
    setSubmitting(true);
    const payload = {
      title: data.title,
      description: data.description || null,
      duration: data.duration || null,
      format: data.format || null,
      fee: data.fee,
      next_batch_date: data.next_batch_date || null,
      is_active: data.is_active,
    };
    const { error } = editing
      ? await supabase.from("courses").update(payload).eq("id", editing.id)
      : await supabase.from("courses").insert(payload);
    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success(editing ? "Course updated" : "Course created");
    setOpen(false);
    load();
  };

  const onDelete = async (c: Course) => {
    if (!confirm(`Delete course "${c.title}"?`)) return;
    const { error } = await supabase.from("courses").delete().eq("id", c.id);
    if (error) return toast.error(error.message);
    toast.success("Course deleted");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" /> New Course
        </Button>
      </div>

      <div className="bg-background border border-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : courses.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No courses yet. Click "New Course" to add one.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Next batch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell>₹{c.fee.toLocaleString()}</TableCell>
                  <TableCell>{c.next_batch_date || "—"}</TableCell>
                  <TableCell>
                    <Badge variant={c.is_active ? "default" : "secondary"}>
                      {c.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(c)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(c)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Course" : "New Course"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <Label>Title</Label>
              <Input {...form.register("title")} />
              {form.formState.errors.title && (
                <p className="text-xs text-destructive mt-1">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
            <div>
              <Label>Description</Label>
              <Textarea rows={3} {...form.register("description")} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Duration</Label>
                <Input placeholder="e.g. 3 months" {...form.register("duration")} />
              </div>
              <div>
                <Label>Format</Label>
                <Input placeholder="e.g. Online" {...form.register("format")} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Fee (₹)</Label>
                <Input type="number" {...form.register("fee")} />
                {form.formState.errors.fee && (
                  <p className="text-xs text-destructive mt-1">
                    {form.formState.errors.fee.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Next batch date</Label>
                <Input type="date" {...form.register("next_batch_date")} />
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="is_active">Active (visible on site)</Label>
              <Switch
                id="is_active"
                checked={form.watch("is_active")}
                onCheckedChange={(v) => form.setValue("is_active", v)}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {editing ? "Save changes" : "Create course"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourses;
