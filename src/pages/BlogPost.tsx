import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  author: string;
  category: string;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!error && data) {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-24">
          <div className="container max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mb-4" />
              <div className="h-4 bg-muted rounded w-1/4 mb-8" />
              <div className="aspect-video bg-muted rounded-xl mb-8" />
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="py-24">
          <div className="container max-w-4xl text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The blog post you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="py-16 md:py-24">
        <div className="container max-w-4xl">
          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.published_at || post.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground">{post.excerpt}</p>
          </header>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-center">
            <h3 className="text-2xl font-bold mb-3">
              Want to Learn More?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join our digital marketing course and master these skills hands-on.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/courses">Explore Our Course</Link>
            </Button>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPostPage;
