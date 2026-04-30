import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Users, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Stat = ({
  icon: Icon,
  label,
  value,
  to,
}: {
  icon: typeof BookOpen;
  label: string;
  value: number | string;
  to?: string;
}) => {
  const inner = (
    <div className="bg-background border border-border rounded-xl p-5 hover:border-primary/40 transition-colors">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </div>
    </div>
  );
  return to ? <Link to={to}>{inner}</Link> : inner;
};

const AdminHome = () => {
  const [counts, setCounts] = useState({
    courses: 0,
    posts: 0,
    enrollments: 0,
    contacts: 0,
  });

  useEffect(() => {
    (async () => {
      const [c, p, e, k] = await Promise.all([
        supabase.from("courses").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("enrollments").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
      ]);
      setCounts({
        courses: c.count ?? 0,
        posts: p.count ?? 0,
        enrollments: e.count ?? 0,
        contacts: k.count ?? 0,
      });
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={BookOpen} label="Courses" value={counts.courses} to="/admin/courses" />
        <Stat icon={FileText} label="Blog posts" value={counts.posts} to="/admin/blog" />
        <Stat icon={Users} label="Enrollments" value={counts.enrollments} />
        <Stat icon={Mail} label="Contact submissions" value={counts.contacts} />
      </div>
    </div>
  );
};

export default AdminHome;
