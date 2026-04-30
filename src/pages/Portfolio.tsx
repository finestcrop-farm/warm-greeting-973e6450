import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "TechStart E-commerce",
    category: "E-commerce",
    description: "Complete digital transformation for an electronics e-commerce store.",
    results: ["+280% Revenue", "50K Monthly Visitors", "4.2% Conversion Rate"],
    services: ["SEO", "Google Ads", "Social Media"],
  },
  {
    title: "Grace Church Online",
    category: "Ministry",
    description: "YouTube growth and website development for a local church community.",
    results: ["10K+ Subscribers", "500K Views/Month", "2X Event Registrations"],
    services: ["YouTube Marketing", "Website Development", "Email Campaigns"],
  },
  {
    title: "HopeNGO Foundation",
    category: "Non-profit",
    description: "Digital fundraising and awareness campaigns for a children's charity.",
    results: ["+500% Donations", "100K Reach", "50+ Volunteers Recruited"],
    services: ["Meta Ads", "Content Marketing", "Donor Management"],
  },
  {
    title: "LocalBiz Marketing",
    category: "SMB",
    description: "Lead generation and brand building for a local service business.",
    results: ["50+ Leads/Month", "3X Brand Awareness", "Google Maps #1"],
    services: ["Local SEO", "Google Ads", "Review Management"],
  },
  {
    title: "FashionHub Store",
    category: "E-commerce",
    description: "Complete WooCommerce setup with integrated marketing automation.",
    results: ["₹10L+ Monthly Sales", "15K Email List", "40% Repeat Customers"],
    services: ["WooCommerce", "Email Automation", "Retargeting"],
  },
  {
    title: "Praise Ministries",
    category: "Ministry",
    description: "Multi-platform presence for an international Christian ministry.",
    results: ["25K Followers", "Weekly Engagement +200%", "Global Reach"],
    services: ["Social Media", "Content Creation", "Live Streaming"],
  },
];

const studentSuccess = [
  {
    name: "Arun Kumar",
    role: "Digital Marketing Executive at TechCorp",
    story: "Completed the course and landed a job within 45 days with a 5 LPA package.",
  },
  {
    name: "Sneha Reddy",
    role: "Freelance Social Media Manager",
    story: "Now managing 5 clients and earning ₹60K/month as a freelancer.",
  },
  {
    name: "David John",
    role: "Church Communications Lead",
    story: "Transformed our church's online presence. YouTube channel grew from 200 to 5000 subscribers.",
  },
];

const Portfolio = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-gradient-primary">Portfolio</span> & Case Studies
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Real results from real projects. See how we've helped businesses and 
              individuals achieve their digital marketing goals.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Projects</h2>
            <p className="text-lg text-muted-foreground">
              Agency work across various industries and niches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-soft transition-all duration-300"
              >
                <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full mb-4">
                  {project.category}
                </span>
                <h3 className="font-semibold text-xl mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.results.map((result) => (
                    <span
                      key={result}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full"
                    >
                      {result}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Success Stories</h2>
            <p className="text-lg text-muted-foreground">
              Our course graduates making an impact in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentSuccess.map((student) => (
              <div
                key={student.name}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center text-2xl font-bold text-secondary mb-4">
                  {student.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-lg mb-1">{student.name}</h3>
                <p className="text-sm text-accent font-medium mb-3">{student.role}</p>
                <p className="text-muted-foreground leading-relaxed">{student.story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want Results Like These?
            </h2>
            <p className="text-lg text-background/70 mb-8">
              Whether you need marketing services for your business or want to learn 
              digital marketing yourself, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
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
                className="border-background/30 text-background hover:bg-background/10"
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

export default Portfolio;
