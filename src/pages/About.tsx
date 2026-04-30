import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Briefcase, Heart, Church, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import nageshPortrait from "@/assets/nagesh-portrait.png";

const values = [
  {
    icon: Sparkles,
    title: "Results-Driven",
    description: "We focus on measurable outcomes, not vanity metrics.",
  },
  {
    icon: Users,
    title: "Personal Mentoring",
    description: "Every student and client gets dedicated attention and guidance.",
  },
  {
    icon: Heart,
    title: "Community-Focused",
    description: "We believe in building relationships, not just transactions.",
  },
  {
    icon: Church,
    title: "Faith-Friendly",
    description: "Special care for ministries and faith-based organizations.",
  },
];

const highlights = [
  { value: "4.5+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "200+", label: "Students Trained" },
  { value: "30+", label: "Active Clients" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Meet Your Mentor: <span className="text-gradient-primary">Nagesh G</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founder of Dreambuilderss, with 4.5+ years of hands-on experience in 
                digital marketing. From managing campaigns for e-commerce brands to 
                helping churches grow their online presence, I bring real-world 
                expertise to every project and every classroom.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                My mission is simple: to help businesses grow and professionals thrive 
                through practical, AI-driven digital marketing education and services.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Work With Me
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/courses">Join My Course</Link>
                </Button>
              </div>
            </div>
            <div className="relative pb-8">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl">
                <img
                  src={nageshPortrait}
                  alt="Nagesh G — Founder & Lead Mentor of Dreambuilderss"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background border border-border rounded-2xl px-6 py-3 shadow-xl text-center whitespace-nowrap">
                <p className="text-lg font-bold">Nagesh G</p>
                <p className="text-sm text-muted-foreground">Founder & Lead Mentor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-foreground text-background">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-background/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Dreambuilderss Story</h2>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="lead text-xl leading-relaxed mb-6">
              Dreambuilderss was born from a simple observation: there's a massive gap between 
              what's taught in traditional marketing courses and what actually works in the 
              real digital world.
            </p>
            <p className="leading-relaxed mb-6">
              After years of working with clients across industries—from local businesses 
              to e-commerce brands, from NGOs to Christian ministries—I realized that the 
              best learning happens when theory meets practice.
            </p>
            <p className="leading-relaxed mb-6">
              That's why Dreambuilderss is both an agency and an academy. Our students work 
              on real client projects. Our clients benefit from fresh perspectives and 
              cutting-edge techniques. It's a win-win ecosystem that produces real results.
            </p>
            <p className="leading-relaxed">
              Today, we're proud to have trained 200+ professionals and delivered 50+ 
              successful projects. But we're just getting started. Our vision is to be 
              the most trusted name in practical digital marketing education in India.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Highlights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-card border border-border">
              <Briefcase className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold text-xl mb-3">Agency Experience</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• E-commerce marketing campaigns</li>
                <li>• Google & Meta Ads management</li>
                <li>• SEO for 20+ websites</li>
                <li>• WordPress development</li>
                <li>• Marketing automation setup</li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border">
              <Award className="h-10 w-10 text-secondary mb-4" />
              <h3 className="font-semibold text-xl mb-3">Training Experience</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 200+ students trained</li>
                <li>• Corporate workshops</li>
                <li>• College guest lectures</li>
                <li>• Online course creation</li>
                <li>• 1-on-1 mentoring</li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border">
              <Church className="h-10 w-10 text-accent mb-4" />
              <h3 className="font-semibold text-xl mb-3">Ministry Focus</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Church website development</li>
                <li>• YouTube channel growth</li>
                <li>• Event promotion campaigns</li>
                <li>• Donor engagement systems</li>
                <li>• Faith-friendly content</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="p-6 rounded-2xl bg-card border border-border text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Build Something Great Together</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Whether you need marketing services or want to learn digital marketing, 
              I'm here to help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90"
                asChild
              >
                <Link to="/services">
                  Explore Services
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/courses">View Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
