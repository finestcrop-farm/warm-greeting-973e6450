import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const courses = [
  {
    title: "Complete Digital Marketing Course",
    duration: "2 Months",
    modules: "12 Modules",
    level: "Beginner to Advanced",
    description: "Master all aspects of digital marketing from SEO to AI tools with live projects.",
    featured: true,
  },
  {
    title: "SEO Mastery",
    duration: "3 Weeks",
    modules: "4 Modules",
    level: "All Levels",
    description: "On-page, off-page & technical SEO to rank your websites higher.",
    featured: false,
  },
  {
    title: "Google Ads Specialist",
    duration: "2 Weeks",
    modules: "3 Modules",
    level: "Intermediate",
    description: "Search, Display & YouTube ads with real campaign management.",
    featured: false,
  },
  {
    title: "AI in Digital Marketing",
    duration: "1 Week",
    modules: "2 Modules",
    level: "All Levels",
    description: "Leverage ChatGPT, AI tools for content, research & automation.",
    featured: false,
  },
];

export const CoursesPreviewSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Training <span className="text-gradient-accent">Programs</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              AI-driven courses designed to make you job-ready and industry-relevant.
            </p>
          </div>
          <Button variant="outlineSecondary" asChild>
            <Link to="/courses">
              View All Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.title}
              className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                course.featured
                  ? "bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20 hover:shadow-glow-blue"
                  : "bg-card border-border hover:border-secondary/20 hover:shadow-soft"
              }`}
            >
              {course.featured && (
                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="font-semibold text-lg mb-3">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
                  <BookOpen className="h-3 w-3" />
                  {course.modules}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
