import { Link } from "react-router-dom";
import {
  Search,
  Target,
  Share2,
  Globe,
  Bot,
  BarChart3,
  Youtube,
  Church,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Monitor,
  BookOpen,
  Star,
  Clock,
  Users,
  Award,
  IndianRupee,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Search,
    title: "SEO & Content Marketing",
    description:
      "Dominate search results with comprehensive SEO strategies. On-page optimization, technical SEO, content creation, and link building to drive organic traffic.",
    features: ["Keyword Research", "On-Page SEO", "Technical Audits", "Content Strategy", "Link Building"],
  },
  {
    icon: Target,
    title: "Google Ads (PPC)",
    description:
      "High-performance pay-per-click campaigns across Search, Display, Shopping, and YouTube. Data-driven optimization for maximum ROI.",
    features: ["Search Campaigns", "Display Ads", "YouTube Ads", "Shopping Ads", "Remarketing"],
  },
  {
    icon: Share2,
    title: "Meta Ads (Facebook & Instagram)",
    description:
      "Reach your ideal audience with targeted social advertising. From awareness to conversions, we manage the full funnel.",
    features: ["Audience Targeting", "Creative Design", "A/B Testing", "Lead Generation", "Retargeting"],
  },
  {
    icon: BarChart3,
    title: "Social Media Management",
    description:
      "Build your brand presence with consistent, engaging content. Strategy, creation, scheduling, and community management.",
    features: ["Content Calendar", "Post Design", "Engagement", "Analytics", "Influencer Outreach"],
  },
  {
    icon: Globe,
    title: "Website & E-Commerce Development",
    description:
      "Beautiful, fast, conversion-optimized websites. WordPress, WooCommerce, landing pages, and custom solutions.",
    features: ["WordPress Sites", "WooCommerce", "Landing Pages", "Speed Optimization", "SEO-Friendly"],
  },
  {
    icon: Bot,
    title: "AI Marketing & Automation",
    description:
      "Leverage AI for smarter marketing. Chatbots, automated workflows, AI-powered content, and predictive analytics.",
    features: ["AI Chatbots", "Email Automation", "AI Content", "Analytics Reports", "Lead Scoring"],
  },
  {
    icon: Church,
    title: "Ministry & NGO Digital Services",
    description:
      "Specialized services for Christian ministries, churches, and non-profits. Faith-friendly approach with impactful results.",
    features: ["Church Websites", "YouTube Growth", "Event Promotion", "Donor Engagement", "Registration Systems"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "We understand your business, goals, audience, and current marketing landscape.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Custom marketing plan with clear KPIs, timelines, and budget allocation.",
  },
  {
    step: "03",
    title: "Implementation",
    description: "Execute campaigns across chosen channels with best practices and creativity.",
  },
  {
    step: "04",
    title: "Optimization",
    description: "Continuous testing, analysis, and refinement to improve performance.",
  },
  {
    step: "05",
    title: "Reporting",
    description: "Transparent, easy-to-understand reports with actionable insights.",
  },
];

const stats = [
  { value: "50+", label: "Campaigns Managed" },
  { value: "30+", label: "Happy Clients" },
  { value: "₹5Cr+", label: "Ad Spend Managed" },
  { value: "4.5+", label: "Years Experience" },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Full-Stack <span className="text-gradient-primary">Digital Marketing</span> Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Your AI-powered marketing partner. From strategy to execution, we help businesses 
              grow with data-driven campaigns and creative excellence.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Request Free Strategy Call
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital marketing services tailored to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-soft transition-all duration-300"
              >
                <div className="flex gap-5">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full"
                        >
                          <CheckCircle2 className="h-3 w-3 text-accent" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that delivers consistent results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="p-6 rounded-2xl bg-card border border-border text-center">
                  <span className="inline-block text-4xl font-bold text-primary/20 mb-3">
                    {step.step}
                  </span>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-background/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recorded Video Classes */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <PlayCircle className="h-4 w-4" />
              Learn at Your Own Pace
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recorded Video <span className="text-gradient-primary">Classes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master digital marketing from anywhere, anytime. Professionally recorded courses covering everything from basics to advanced strategies — perfect for business owners who want to understand and manage their own marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Marketing Fundamentals",
                price: "₹2,999",
                originalPrice: "₹5,999",
                duration: "12+ Hours",
                lessons: "45 Lessons",
                level: "Beginner",
                description: "Start from zero. Learn SEO, social media, Google Ads, email marketing, and analytics. Build a solid foundation for your business growth.",
                modules: ["Introduction to Digital Marketing Landscape", "SEO Basics & Keyword Research", "Social Media Marketing Essentials", "Google Ads for Beginners", "Email Marketing & Lead Generation", "Analytics & Performance Tracking"],
                bestFor: "New business owners, freelancers, students",
              },
              {
                title: "Advanced Google & Meta Ads Mastery",
                price: "₹4,999",
                originalPrice: "₹9,999",
                duration: "18+ Hours",
                lessons: "62 Lessons",
                level: "Intermediate",
                description: "Deep-dive into paid advertising. Campaign setup, audience targeting, bidding strategies, conversion tracking, and scaling profitable campaigns.",
                modules: ["Google Search & Display Campaign Setup", "Advanced Audience Targeting & Lookalikes", "Meta Ads: Funnel-Based Campaign Strategy", "Conversion Tracking & Attribution", "A/B Testing & Creative Optimization", "Scaling Campaigns & Budget Management"],
                bestFor: "Marketers, agency owners, e-commerce businesses",
                popular: true,
              },
              {
                title: "AI-Powered Marketing & Automation",
                price: "₹3,999",
                originalPrice: "₹7,999",
                duration: "10+ Hours",
                lessons: "35 Lessons",
                level: "Advanced",
                description: "Stay ahead of the curve. Leverage AI tools for content creation, chatbots, automated workflows, and data-driven decision making.",
                modules: ["AI Tools for Content & Copywriting", "Chatbot Setup & Conversational Marketing", "Marketing Automation Workflows", "AI-Powered Analytics & Insights", "Personalization at Scale", "Future Trends in AI Marketing"],
                bestFor: "Growth marketers, tech-savvy entrepreneurs",
              },
            ].map((course) => (
              <div key={course.title} className={`relative flex flex-col rounded-2xl bg-card border ${course.popular ? 'border-primary shadow-lg scale-[1.02]' : 'border-border'} overflow-hidden transition-all duration-300 hover:shadow-soft`}>
                {course.popular && (
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    <Star className="h-3 w-3" /> Most Popular
                  </div>
                )}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">{course.level}</span>
                  <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{course.description}</p>
                  <div className="flex items-center gap-4 mb-5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</span>
                    <span className="flex items-center gap-1"><PlayCircle className="h-4 w-4" />{course.lessons}</span>
                  </div>
                  <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">What You'll Learn</p>
                    <ul className="space-y-2">
                      {course.modules.map((mod) => (
                        <li key={mod} className="flex items-start gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />{mod}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-muted-foreground mb-5"><span className="font-semibold">Best for:</span> {course.bestFor}</p>
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-foreground">{course.price}</span>
                      <span className="text-lg text-muted-foreground line-through">{course.originalPrice}</span>
                      <span className="text-xs font-semibold text-accent">Lifetime Access</span>
                    </div>
                    <Button variant="hero" className="w-full" asChild>
                      <Link to="/contact">Enroll Now <ArrowRight className="h-4 w-4" /></Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: PlayCircle, text: "HD Video Lessons" },
              { icon: Clock, text: "Lifetime Access" },
              { icon: Award, text: "Completion Certificate" },
              { icon: Users, text: "Community Support" },
            ].map((perk) => (
              <div key={perk.text} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50">
                <perk.icon className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">{perk.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Online Training */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Monitor className="h-4 w-4" />
              Interactive Live Sessions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Live Online <span className="text-gradient-primary">Training Programs</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn digital marketing live with industry experts. Real-time doubt clearing, hands-on projects, and personalized mentorship — all from the comfort of your home or office.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Complete Digital Marketing Pro Program",
                price: "₹14,999",
                originalPrice: "₹29,999",
                duration: "3 Months",
                schedule: "Weekday Batches (Mon–Fri, 7–9 PM)",
                seats: "Limited to 25 students per batch",
                description: "Our flagship program covering the complete digital marketing stack. From SEO to paid ads, social media to automation — become a full-stack digital marketer with hands-on live training.",
                includes: ["60+ hours of live instructor-led training", "Real client projects & portfolio building", "Google Ads & Meta Ads certification prep", "1-on-1 mentorship & career guidance", "Resume building & interview preparation", "6 months post-training support", "Access to private alumni community", "Internship & placement assistance"],
                tools: ["Google Ads", "Meta Business Suite", "SEMrush", "Canva", "Mailchimp", "Google Analytics", "ChatGPT", "WordPress"],
              },
              {
                title: "Business Owner's Digital Growth Bootcamp",
                price: "₹9,999",
                originalPrice: "₹19,999",
                duration: "6 Weeks",
                schedule: "Weekend Batches (Sat–Sun, 10 AM–1 PM)",
                seats: "Limited to 15 business owners per batch",
                description: "Designed specifically for entrepreneurs and business owners who want to understand digital marketing enough to grow their business or manage their in-house/agency team effectively.",
                includes: ["36+ hours of live weekend training", "Work directly on YOUR business during sessions", "Audit of your current digital presence", "Custom marketing plan for your business", "Ad campaign setup done live for your brand", "Competitor analysis & market positioning", "3 months post-training strategy support", "Exclusive business owners' WhatsApp group"],
                tools: ["Google My Business", "Meta Ads", "Instagram", "WhatsApp Business", "Canva", "Google Analytics"],
              },
            ].map((program) => (
              <div key={program.title} className="flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/20 hover:shadow-soft transition-all duration-300">
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{program.description}</p>
                  <div className="flex flex-wrap gap-3 mb-5 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-4 w-4 text-primary" />{program.duration}</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><Monitor className="h-4 w-4 text-primary" />{program.schedule}</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><Users className="h-4 w-4 text-primary" />{program.seats}</span>
                  </div>
                  <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">What's Included</p>
                    <ul className="space-y-2">
                      {program.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Tools You'll Master</p>
                    <div className="flex flex-wrap gap-2">
                      {program.tools.map((tool) => (
                        <span key={tool} className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">{tool}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-foreground">{program.price}</span>
                      <span className="text-lg text-muted-foreground line-through">{program.originalPrice}</span>
                      <span className="text-xs font-semibold text-accent">EMI Available</span>
                    </div>
                    <Button variant="hero" className="w-full" asChild>
                      <Link to="/contact">Reserve Your Seat <ArrowRight className="h-4 w-4" /></Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Our Services (Done-For-You) */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              Done-For-You Marketing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Book Our <span className="text-gradient-primary">Marketing Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't have time to learn? Let our expert team handle your digital marketing end-to-end. Choose a plan that fits your business and watch the results roll in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Starter Growth",
                subtitle: "For small businesses & startups",
                price: "₹15,000",
                period: "/month",
                description: "Get your digital presence off the ground. Ideal for local businesses, freelancers, and startups with limited budgets who need a strong online foundation.",
                features: ["Google My Business setup & optimization", "Social media management (2 platforms)", "8 social media posts/month with design", "Basic SEO setup (on-page optimization)", "Monthly performance report", "WhatsApp & email support"],
                adSpend: "Ad spend: ₹5,000–₹15,000/month (paid separately)",
              },
              {
                title: "Business Accelerator",
                subtitle: "For growing businesses",
                price: "₹35,000",
                period: "/month",
                description: "Scale your marketing with a multi-channel approach. Perfect for businesses ready to invest in paid ads and content marketing to generate consistent leads.",
                features: ["Everything in Starter Growth", "Google Ads management (Search + Display)", "Meta Ads management (Facebook + Instagram)", "15 social media posts/month with design", "SEO: keyword tracking & content optimization", "Landing page creation (1/month)", "Lead tracking & CRM setup", "Bi-weekly strategy calls"],
                adSpend: "Ad spend: ₹20,000–₹50,000/month (paid separately)",
                popular: true,
              },
              {
                title: "Enterprise Domination",
                subtitle: "For established brands",
                price: "₹75,000",
                period: "/month",
                description: "Full-scale digital marketing command. For businesses that need an entire marketing department without the overhead. Strategy, execution, and optimization — all handled.",
                features: ["Everything in Business Accelerator", "Advanced Google Ads (Search, Display, YouTube, Shopping)", "Advanced Meta Ads with full-funnel strategy", "30 social media posts/month + Stories/Reels", "Comprehensive SEO & content marketing", "Email marketing & automation setup", "AI chatbot setup & management", "Custom analytics dashboard", "Dedicated account manager", "Weekly strategy & review calls"],
                adSpend: "Ad spend: ₹50,000+/month (paid separately)",
              },
            ].map((plan) => (
              <div key={plan.title} className={`relative flex flex-col rounded-2xl bg-card border ${plan.popular ? 'border-primary shadow-lg scale-[1.02]' : 'border-border'} overflow-hidden transition-all duration-300 hover:shadow-soft`}>
                {plan.popular && (
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    <Star className="h-3 w-3" /> Best Value
                  </div>
                )}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{plan.subtitle}</p>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-5">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <div className="mb-5 flex-1">
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3 mb-5 flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" /> {plan.adSpend}
                  </p>
                  <Button variant="hero" className="w-full" asChild>
                    <Link to="/contact">Get Started <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground text-sm mb-4">Need a custom package? We create tailored solutions for unique business needs.</p>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Request Custom Quote <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Whether you want to learn marketing yourself, get trained live, or have our experts handle everything — we've got you covered.
            </p>
            <Button size="xl" className="bg-background text-primary hover:bg-background/90" asChild>
              <Link to="/contact">
                Get Free Marketing Strategy Call
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
