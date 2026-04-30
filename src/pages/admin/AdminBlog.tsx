import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
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
import { format } from "date-fns";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);

const postSchema = z.object({
  title: z.string().trim().min(2).max(200),
  slug: z.string().trim().min(2).max(200).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  excerpt: z.string().trim().min(2).max(500),
  content: z.string().trim().min(10),
  category: z.string().trim().min(2).max(100),
  tags: z.string().max(500).optional().or(z.literal("")),
  cover_image: z.string().url().optional().or(z.literal("")),
  author: z.string().trim().min(2).max(100),
  is_published: z.boolean(),
});

type PostForm = z.infer<typeof postSchema>;

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[] | null;
  cover_image: string | null;
  author: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

const emptyDefaults: PostForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  tags: "",
  cover_image: "",
  author: "Dreambuilderss Team",
  is_published: false,
};

const AdminBlog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<PostForm>({
    resolver: zodResolver(postSchema),
    defaultValues: emptyDefaults,
  });

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setPosts((data ?? []) as Post[]);
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

  const openEdit = (p: Post) => {
    setEditing(p);
    form.reset({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      category: p.category,
      tags: (p.tags ?? []).join(", "),
      cover_image: p.cover_image ?? "",
      author: p.author,
      is_published: p.is_published,
    });
    setOpen(true);
  };

  const onTitleBlur = () => {
    if (!editing && !form.getValues("slug")) {
      form.setValue("slug", slugify(form.getValues("title")));
    }
  };

  const onSubmit = async (data: PostForm) => {
    setSubmitting(true);
    const tagsArr = data.tags
      ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];
    const payload = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      tags: tagsArr,
      cover_image: data.cover_image || null,
      author: data.author,
      is_published: data.is_published,
      published_at:
        data.is_published && (!editing || !editing.published_at)
          ? new Date().toISOString()
          : editing?.published_at ?? null,
    };
    const { error } = editing
      ? await supabase.from("blog_posts").update(payload).eq("id", editing.id)
      : await supabase.from("blog_posts").insert(payload);
    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success(editing ? "Post updated" : "Post created");
    setOpen(false);
    load();
  };

  const togglePublish = async (p: Post) => {
    const newVal = !p.is_published;
    const { error } = await supabase
      .from("blog_posts")
      .update({
        is_published: newVal,
        published_at: newVal && !p.published_at ? new Date().toISOString() : p.published_at,
      })
      .eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success(newVal ? "Published" : "Unpublished");
    load();
  };

  const onDelete = async (p: Post) => {
    if (!confirm(`Delete post "${p.title}"?`)) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success("Post deleted");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" /> New Post
        </Button>
      </div>

      <div className="bg-background border border-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No posts yet. Click "New Post" to add one.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(p.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={p.is_published ? "default" : "secondary"}>
                      {p.is_published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublish(p)}
                      title={p.is_published ? "Unpublish" : "Publish"}
                    >
                      {p.is_published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => openEdit(p)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(p)}>
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Post" : "New Post"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <Label>Title</Label>
              <Input {...form.register("title", { onBlur: onTitleBlur })} />
              {form.formState.errors.title && (
                <p className="text-xs text-destructive mt-1">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
            <div>
              <Label>Slug</Label>
              <Input {...form.register("slug")} />
              {form.formState.errors.slug && (
                <p className="text-xs text-destructive mt-1">
                  {form.formState.errors.slug.message}
                </p>
              )}
            </div>
            <div>
              <Label>Excerpt</Label>
              <Textarea rows={2} {...form.register("excerpt")} />
              {form.formState.errors.excerpt && (
                <p className="text-xs text-destructive mt-1">
                  {form.formState.errors.excerpt.message}
                </p>
              )}
            </div>
            <div>
              <Label>Content (Markdown)</Label>
              <Textarea rows={12} className="font-mono text-sm" {...form.register("content")} />
              {form.formState.errors.content && (
                <p className="text-xs text-destructive mt-1">
                  {form.formState.errors.content.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Category</Label>
                <Input {...form.register("category")} />
                {form.formState.errors.category && (
                  <p className="text-xs text-destructive mt-1">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Author</Label>
                <Input {...form.register("author")} />
              </div>
            </div>
            <div>
              <Label>Tags (comma-separated)</Label>
              <Input placeholder="seo, marketing, ai" {...form.register("tags")} />
            </div>
            <div>
              <Label>Cover image URL</Label>
              <Input placeholder="https://..." {...form.register("cover_image")} />
              {form.formState.errors.cover_image && (
                <p className="text-xs text-destructive mt-1">
                  {form.formState.errors.cover_image.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="is_published">Published (visible on site)</Label>
              <Switch
                id="is_published"
                checked={form.watch("is_published")}
                onCheckedChange={(v) => form.setValue("is_published", v)}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {editing ? "Save changes" : "Create post"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
