import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/useAuth";

const credSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

type CredForm = z.infer<typeof credSchema>;

const Auth = () => {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate("/admin", { replace: true });
  }, [session, loading, navigate]);

  const signIn = useForm<CredForm>({ resolver: zodResolver(credSchema) });
  const signUp = useForm<CredForm>({ resolver: zodResolver(credSchema) });

  const onSignIn = async (data: CredForm) => {
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success("Signed in");
    navigate("/admin");
  };

  const onSignUp = async (data: CredForm) => {
    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success("Account created");
    navigate("/admin");
  };

  const onGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/admin`,
    });
    if (result.error) toast.error("Google sign-in failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md bg-background border border-border rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to manage Dreambuilderss content
          </p>
        </div>

        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={signIn.handleSubmit(onSignIn)} className="space-y-3">
              <div>
                <Label>Email</Label>
                <Input type="email" {...signIn.register("email")} />
                {signIn.formState.errors.email && (
                  <p className="text-xs text-destructive mt-1">
                    {signIn.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" {...signIn.register("password")} />
                {signIn.formState.errors.password && (
                  <p className="text-xs text-destructive mt-1">
                    {signIn.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={signUp.handleSubmit(onSignUp)} className="space-y-3">
              <div>
                <Label>Email</Label>
                <Input type="email" {...signUp.register("email")} />
                {signUp.formState.errors.email && (
                  <p className="text-xs text-destructive mt-1">
                    {signUp.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" {...signUp.register("password")} />
                {signUp.formState.errors.password && (
                  <p className="text-xs text-destructive mt-1">
                    {signUp.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Create Account
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                The first registered user becomes the admin.
              </p>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={onGoogle}>
          Continue with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="hover:underline">← Back to site</Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
