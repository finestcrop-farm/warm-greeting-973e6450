import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Receipt, CheckCircle2, Clock, XCircle, Mail } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const lookupSchema = z.object({
  order_id: z.string().trim().min(3, "Order ID is required").max(200),
  email: z.string().trim().email("Enter the email used at checkout").max(255),
});

type LookupForm = z.infer<typeof lookupSchema>;

interface Receipt {
  student_name: string;
  email: string;
  course_title: string | null;
  amount: number;
  payment_status: string;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  created_at: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { variant: "default" | "secondary" | "destructive"; icon: typeof CheckCircle2; label: string }> = {
    paid: { variant: "default", icon: CheckCircle2, label: "Paid" },
    pending: { variant: "secondary", icon: Clock, label: "Pending" },
    failed: { variant: "destructive", icon: XCircle, label: "Failed" },
  };
  const cfg = map[status] ?? map.pending;
  const Icon = cfg.icon;
  return (
    <Badge variant={cfg.variant} className="gap-1">
      <Icon className="h-3 w-3" /> {cfg.label}
    </Badge>
  );
};

const EnrollmentReceipt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [notFound, setNotFound] = useState(false);

  const form = useForm<LookupForm>({ resolver: zodResolver(lookupSchema) });

  const onSubmit = async (data: LookupForm) => {
    setSubmitting(true);
    setNotFound(false);
    setReceipt(null);
    const { data: rows, error } = await supabase.rpc("lookup_enrollment_receipt", {
      _order_id: data.order_id,
      _email: data.email,
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    const found = (rows as Receipt[] | null)?.[0];
    if (!found) {
      setNotFound(true);
      return;
    }
    setReceipt(found);
  };

  const reset = () => {
    setReceipt(null);
    setNotFound(false);
    form.reset();
  };

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <Receipt className="h-10 w-10 text-primary mx-auto mb-3" />
            <h1 className="text-3xl md:text-4xl font-bold mb-2">View Your Receipt</h1>
            <p className="text-muted-foreground">
              Enter the order ID and email used at checkout to see your enrollment.
            </p>
          </div>

          {!receipt && (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-background border border-border rounded-2xl p-6 md:p-8 space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="order_id">Razorpay Order ID</Label>
                <Input id="order_id" placeholder="order_XXXXXXXXXX" {...form.register("order_id")} />
                {form.formState.errors.order_id && (
                  <p className="text-xs text-destructive">{form.formState.errors.order_id.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email used at checkout</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    placeholder="you@example.com"
                    {...form.register("email")}
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Find My Enrollment
              </Button>
              {notFound && (
                <p className="text-sm text-center text-destructive">
                  No matching enrollment found. Please double-check your order ID and email.
                </p>
              )}
            </form>
          )}

          {receipt && (
            <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Enrollment Receipt</h2>
                <StatusBadge status={receipt.payment_status} />
              </div>

              <dl className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <dt className="text-muted-foreground">Student</dt>
                  <dd className="col-span-2 font-medium">{receipt.student_name}</dd>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="col-span-2">{receipt.email}</dd>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <dt className="text-muted-foreground">Course</dt>
                  <dd className="col-span-2 font-medium">{receipt.course_title ?? "—"}</dd>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <dt className="text-muted-foreground">Amount</dt>
                  <dd className="col-span-2">₹{receipt.amount.toLocaleString()}</dd>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <dt className="text-muted-foreground">Order ID</dt>
                  <dd className="col-span-2 font-mono text-xs break-all">{receipt.razorpay_order_id}</dd>
                </div>
                {receipt.razorpay_payment_id && (
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <dt className="text-muted-foreground">Payment ID</dt>
                    <dd className="col-span-2 font-mono text-xs break-all">
                      {receipt.razorpay_payment_id}
                    </dd>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <dt className="text-muted-foreground">Date</dt>
                  <dd className="col-span-2">
                    {format(new Date(receipt.created_at), "PPP p")}
                  </dd>
                </div>
              </dl>

              <div className="flex gap-3 mt-8">
                <Button variant="outline" onClick={reset} className="flex-1">
                  Look up another
                </Button>
                <Button onClick={() => window.print()} className="flex-1">
                  Print receipt
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default EnrollmentReceipt;
