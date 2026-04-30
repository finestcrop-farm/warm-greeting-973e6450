import { Building2, GraduationCap, Briefcase, Church, Heart } from "lucide-react";

const audiences = [
  {
    icon: Building2,
    title: "Businesses",
    description: "SMBs & e-commerce brands looking to scale with data-driven marketing.",
    color: "primary",
  },
  {
    icon: GraduationCap,
    title: "Students & Job Seekers",
    description: "Build job-ready skills with practical, industry-relevant training.",
    color: "secondary",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    description: "Learn to land clients and build a sustainable freelance career.",
    color: "accent",
  },
  {
    icon: Church,
    title: "Christian Ministries",
    description: "Amplify your message with faith-friendly digital strategies.",
    color: "primary",
  },
  {
    icon: Heart,
    title: "NGOs & Foundations",
    description: "Reach more supporters and maximize your social impact online.",
    color: "secondary",
  },
];

const colorClasses = {
  primary: {
    bg: "bg-orange-light",
    icon: "text-primary",
  },
  secondary: {
    bg: "bg-blue-light",
    icon: "text-secondary",
  },
  accent: {
    bg: "bg-green-light",
    icon: "text-accent",
  },
};

export const WhoWeHelpSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Who We <span className="text-gradient-primary">Help</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're a business looking to grow or an individual ready to learn, 
            we have solutions tailored for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {audiences.map((audience, index) => {
            const colors = colorClasses[audience.color as keyof typeof colorClasses];
            return (
              <div
                key={audience.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <audience.icon className={`h-7 w-7 ${colors.icon}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{audience.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
