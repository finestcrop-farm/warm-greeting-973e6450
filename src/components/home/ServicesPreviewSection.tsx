import { Link } from "react-router-dom";
import { ArrowRight, Search, Target, Share2, Globe, Bot, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Target,
    title: "Digital Marketing Strategy",
    description: "Comprehensive strategy & consulting to align your marketing with business goals.",
  },
  {
    icon: Search,
    title: "SEO & Content",
    description: "Rank higher on Google with technical SEO, content marketing & link building.",
  },
  {
    icon: BarChart3,
    title: "Google & Meta Ads",
    description: "Performance-driven PPC campaigns across Search, Display, YouTube & Social.",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Build your brand presence with engaging content & community management.",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "WordPress, WooCommerce & custom websites optimized for conversions.",
  },
  {
    icon: Bot,
    title: "AI-Driven Automation",
    description: "Chatbots, marketing automation & AI-powered analytics reporting.",
  },
];

export const ServicesPreviewSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient-primary">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Full-stack digital marketing services powered by AI and driven by results.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
