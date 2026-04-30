import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-16 md:py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur rounded-full text-sm font-medium text-foreground mb-6 animate-fade-in-up">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span>AI-Driven Marketing Solutions</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up delay-100">
              Digital Marketing{" "}
              <span className="text-gradient-primary">Agency</span> &{" "}
              <span className="text-gradient-accent">Training Institute</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up delay-200">
              Grow your business and your career with performance-driven marketing 
              and hands-on courses. Powered by AI, guided by experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fade-in-up delay-300">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  Get Free Strategy Call
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroSecondary" size="lg" asChild>
                <Link to="/courses">
                  Join Digital Marketing Course
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground animate-fade-in-up delay-400">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <span className="text-secondary font-bold">NG</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Mentor: Nagesh G</p>
                  <p className="text-xs">4.5+ years experience</p>
                </div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-left">
                <p className="font-semibold text-foreground">50+ Projects</p>
                <p className="text-xs">Successfully delivered</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in-up delay-200">
            <div className="relative">
              <img
                src={heroImage}
                alt="Digital Marketing Growth Illustration"
                className="w-full h-auto animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
