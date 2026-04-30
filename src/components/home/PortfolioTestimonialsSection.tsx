import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "E-commerce Owner",
    content: "Dreambuilderss transformed our online presence. Our sales grew 3x in just 4 months with their Google Ads strategy.",
    rating: 5,
    type: "client",
  },
  {
    name: "Rahul Verma",
    role: "Course Graduate",
    content: "The hands-on training with real projects gave me confidence. Landed my first digital marketing job within 2 months of completing the course!",
    rating: 5,
    type: "student",
  },
  {
    name: "Pastor James",
    role: "Church Ministry",
    content: "They understand the unique needs of Christian ministries. Our YouTube channel and website now reach thousands more people.",
    rating: 5,
    type: "client",
  },
];

const portfolioItems = [
  {
    title: "TechStart E-commerce",
    category: "E-commerce",
    result: "+280% Revenue",
  },
  {
    title: "Grace Church Online",
    category: "Ministry",
    result: "10K+ Subscribers",
  },
  {
    title: "HopeNGO Foundation",
    category: "Non-profit",
    result: "+500% Donations",
  },
  {
    title: "LocalBiz Marketing",
    category: "SMB",
    result: "50+ Leads/Month",
  },
];

export const PortfolioTestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        {/* Portfolio Preview */}
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient-primary">Results</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from real projects across various industries.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {portfolioItems.map((item) => (
              <div
                key={item.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-soft transition-all duration-300 text-center"
              >
                <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full mb-3">
                  {item.category}
                </span>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-2xl md:text-3xl font-bold text-primary">{item.result}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What People <span className="text-gradient-accent">Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border"
              >
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-semibold text-primary">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
