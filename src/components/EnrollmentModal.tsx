import { useState } from "react";
import { X, User, Mail, Phone, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Course {
  id: string;
  title: string;
  fee: number;
}

interface EnrollmentModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollmentModal = ({ course, isOpen, onClose }: EnrollmentModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    student_name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const id = crypto.randomUUID();
      const submission = {
        id,
        course_id: course.id,
        student_name: formData.student_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        amount: course.fee,
        payment_status: "pending",
      };

      const { error } = await supabase.from("enrollments").insert(submission);
      if (error) throw error;

      // Fire notification emails (non-blocking)
      supabase.functions
        .invoke("notify-new-submission", {
          body: {
            type: "enrollment",
            id,
            studentName: submission.student_name,
            email: submission.email,
            phone: submission.phone,
            courseTitle: course.title,
            amount: course.fee,
          },
        })
        .catch((err) => console.error("Notify failed:", err));

      setIsSuccess(true);
      toast({
        title: "Registration Successful!",
        description: "Check your inbox — we've sent a confirmation email.",
      });
    } catch (error) {
      console.error("Enrollment error:", error);
      toast({
        title: "Registration Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ student_name: "", email: "", phone: "" });
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-xl border border-border overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold">Course Enrollment</h2>
            <p className="text-sm text-muted-foreground">{course.title}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">You're Registered!</h3>
              <p className="text-muted-foreground mb-6">
                Our team will contact you within 24 hours with payment details and next steps.
              </p>
              <Button onClick={handleClose}>Close</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="student_name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="student_name"
                    type="text"
                    required
                    value={formData.student_name}
                    onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                    placeholder="Your full name"
                    className="pl-10"
                    maxLength={100}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="pl-10"
                    maxLength={255}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="pl-10"
                    maxLength={20}
                  />
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="font-medium">{course.title}</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  ₹{course.fee.toLocaleString("en-IN")}
                </p>
                <p className="text-sm text-muted-foreground">
                  Payment details will be shared after registration
                </p>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register Now"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By registering, you agree to our terms and privacy policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
