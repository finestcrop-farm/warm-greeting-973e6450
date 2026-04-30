import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle, MailX } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

type Status = "loading" | "valid" | "invalid" | "already" | "submitting" | "done" | "error";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const FN_URL = `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`;

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${FN_URL}?token=${encodeURIComponent(token)}`, {
          headers: { apikey: SUPABASE_ANON_KEY },
        });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setStatus("invalid");
          return;
        }
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setStatus("already");
        } else if (data.valid) {
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const confirm = async () => {
    setStatus("submitting");
    try {
      const res = await fetch(FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success) setStatus("done");
      else if (data.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Layout>
      <section className="py-20 md:py-28 bg-gradient-hero min-h-[60vh] flex items-center">
        <div className="container max-w-lg">
          <div className="bg-card border border-border rounded-2xl shadow-xl p-8 md:p-10 text-center">
            {status === "loading" && (
              <>
                <Loader2 className="h-10 w-10 text-muted-foreground animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Verifying your unsubscribe link…</p>
              </>
            )}

            {status === "valid" && (
              <>
                <MailX className="h-12 w-12 text-primary mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-3">Unsubscribe from emails?</h1>
                <p className="text-muted-foreground mb-6">
                  You'll stop receiving emails from Dreambuilderss. You can always reach
                  out to us anytime if you change your mind.
                </p>
                <Button variant="hero" size="lg" onClick={confirm} className="w-full">
                  Confirm Unsubscribe
                </Button>
              </>
            )}

            {status === "submitting" && (
              <>
                <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Processing…</p>
              </>
            )}

            {status === "done" && (
              <>
                <CheckCircle2 className="h-12 w-12 text-accent mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-3">You're unsubscribed</h1>
                <p className="text-muted-foreground mb-6">
                  We've removed your email from our list. You won't receive any more
                  emails from us.
                </p>
                <Button asChild variant="outline">
                  <Link to="/">Back to home</Link>
                </Button>
              </>
            )}

            {status === "already" && (
              <>
                <CheckCircle2 className="h-12 w-12 text-accent mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-3">Already unsubscribed</h1>
                <p className="text-muted-foreground mb-6">
                  This email is already unsubscribed from our list.
                </p>
                <Button asChild variant="outline">
                  <Link to="/">Back to home</Link>
                </Button>
              </>
            )}

            {(status === "invalid" || status === "error") && (
              <>
                <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-3">
                  {status === "error" ? "Something went wrong" : "Invalid link"}
                </h1>
                <p className="text-muted-foreground mb-6">
                  This unsubscribe link is invalid or has expired. If you'd like to stop
                  receiving emails, please contact us directly.
                </p>
                <Button asChild variant="outline">
                  <Link to="/contact">Contact us</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Unsubscribe;
