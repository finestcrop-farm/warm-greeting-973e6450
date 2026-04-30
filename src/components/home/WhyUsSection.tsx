import { Check, Sparkles, Users, Briefcase, Award, HeartHandshake } from "lucide-react";

const usps = [
  {
    icon: Sparkles,
    title: "Agency + Academy Advantage",
    description: "Learn from practitioners who run real campaigns daily.",
  },
  {
    icon: Users,
    title: "AI-Driven Syllabus",
    description: "Updated curriculum with the latest AI tools and techniques.",
  },
  {
    icon: Briefcase,
    title: "Live Client Projects",
    description: "Work on real projects, not just case studies.",
  },
  {
    icon: Award,
    title: "Personal Mentoring",
    description: "1-on-1 guidance from experienced digital marketers.",
  },
  {
    icon: HeartHandshake,
    title: "Placement Guidance",
    description: "Resume building, interview prep & job referrals.",
  },
];

export const WhyUsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-primary">Dreambuilderss</span>?
          </h2>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            We combine agency expertise with training excellence to give you a unique advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {usps.map((usp) => (
            <div
              key={usp.title}
              className="flex gap-4 p-6 rounded-2xl bg-background/5 border border-background/10 hover:bg-background/10 transition-colors"
            >
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <usp.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{usp.title}</h3>
                <p className="text-background/70 text-sm leading-relaxed">{usp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
