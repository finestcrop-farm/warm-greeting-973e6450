import { NavLink, Outlet, Link } from "react-router-dom";
import { LogOut, BookOpen, FileText, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground"
  }`;

const AdminLayout = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="container flex items-center justify-between h-16">
          <Link to="/admin" className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <span className="font-bold">Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="space-y-1 lg:sticky lg:top-8 self-start">
          <NavLink to="/admin/courses" className={linkClass}>
            <BookOpen className="h-4 w-4" /> Courses
          </NavLink>
          <NavLink to="/admin/blog" className={linkClass}>
            <FileText className="h-4 w-4" /> Blog Posts
          </NavLink>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground"
          >
            ← View site
          </Link>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
