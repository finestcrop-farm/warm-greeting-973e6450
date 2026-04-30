import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, Globe, MapPin, ExternalLink, Star, Youtube, Users, Eye, Briefcase, Send } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const stats = [
  { value: "3+", label: "Years Experience", sub: "SEO · Ads · WordPress · YouTube", icon: Briefcase },
  { value: "12K+", label: "YouTube Subscribers", sub: "Organic channel growth", icon: Youtube },
  { value: "60L+", label: "Video Views", sub: "6 Million+ reached organically", icon: Eye },
  { value: "5★", label: "Client Rating", sub: "Upwork · Fiverr · Direct", icon: Star },
  { value: "50+", label: "Projects Delivered", sub: "Across 5+ industries", icon: Users },
];

const tickerItems = [
  "SEO Strategy", "Google Ads", "Meta Ads", "YouTube Growth", "WordPress Development",
  "Lead Generation", "Social Media Marketing", "AI-Powered Marketing", "Performance Analytics",
  "Brand Building", "Content Strategy", "Email Automation", "Church & Christian Media",
];

const experience = [
  {
    icon: "🏢", title: "Full Stack Digital Marketer", company: "Mactosoft Pvt. Ltd. · Secunderabad · Aug 2023 – Present",
    points: ["Managed end-to-end digital marketing strategy across all channels", "Built & managed WordPress website: mactosoftpvt.ltd", "Executed Google Ads & Meta Ads campaigns with full conversion tracking", "Implemented GA4 analytics dashboards and performance reporting", "Managed SEO, SMM and lead generation funnels for client acquisition", "Leveraged AI tools for productivity and campaign optimisation"],
  },
  {
    icon: "👑", title: "Digital Marketing Strategist", company: "Poshin.in · Luxury Accessories Brand · 2023",
    points: ["Created and managed full WordPress website: poshin.in", "Developed complete social media content strategy from scratch", "Managed Instagram, Facebook & YouTube content calendars", "Wrote SEO blogs & organic content for search visibility", "Designed marketing creatives, video edits & campaign assets", "Executed digital campaigns for luxury brand positioning"],
  },
  {
    icon: "⛪", title: "Full Digital Marketer", company: "Faith JourneyHub · Christian Media · 2022–2023", badge: "▶ YouTube Achievement Unlocked",
    points: ["Managed complete Christian lyrics website and digital presence", "Handled Instagram, Facebook & YouTube growth strategy", "Grew YouTube channel to 12,000+ Subscribers", "Achieved 60+ Lakh (6M+) Views through YouTube SEO", "Monetisation strategy and video optimisation for audience retention"],
  },
  {
    icon: "✝", title: "Digital Marketer", company: "Jesus Christ Annointing Ministries · 2022",
    points: ["Managed complete social media presence across all platforms", "Content creation, scheduling & community engagement", "Growth strategy & outreach campaigns for ministry reach"],
  },
  {
    icon: "🎨", title: "Daily Graphic Designer", company: "Divine Light Ministries · 2021–2022",
    points: ["Designed daily Christian social media creatives consistently", "Festival campaigns, event promotions & visual storytelling", "Engagement-based visual branding strategy for the community"],
  },
  {
    icon: "🎓", title: "Digital Marketing Mentor", company: "Vedanta Institute & Dreambuilderss · 2022–Present",
    points: ["Conducted practical digital marketing training programs for students", "Mentored students in SEO, Ads & freelancing career paths", "Built career-focused training modules and course curricula", "Guided aspiring freelancers to successful client acquisition"],
  },
];

const websites = [
  { icon: "🏢", name: "mactosoftpvt.ltd", desc: "Corporate IT company website — WordPress, SEO-optimised, lead generation" },
  { icon: "🌐", name: "dreambuilderss.com", desc: "Agency website — full WordPress build, services, lead capture & automation" },
  { icon: "👜", name: "poshin.in", desc: "Luxury accessories eCommerce — product pages, SEO, brand content" },
  { icon: "⛪", name: "Church & Christian Platforms", desc: "Lyrics platforms, ministry websites — community-focused WordPress builds" },
];

const expertiseAreas = [
  { icon: "📈", title: "Performance Marketing", items: ["Google Ads (Search, Display, PMax)", "Meta Ads (Lead Gen & Sales)", "YouTube Ads", "Conversion Tracking & GA4", "ROI Optimisation"] },
  { icon: "🔍", title: "SEO & Organic Growth", items: ["Technical SEO Audits", "On-Page & Off-Page SEO", "Keyword Strategy & Mapping", "Local SEO & Google Business", "YouTube SEO Optimisation"] },
  { icon: "🎥", title: "YouTube Growth Strategy", items: ["Channel Setup & Optimisation", "Thumbnail & Title Strategy", "CTR & Watch Time Improvement", "Viral Content Strategy", "Monetisation Consulting"] },
  { icon: "🌐", title: "WordPress Development", items: ["Business Websites from Scratch", "Landing Page Development", "Speed & Core Web Vitals", "SEO Setup & Schema Markup", "Automation & CRM Integration"] },
  { icon: "📱", title: "Social Media Marketing", items: ["Content Calendar Planning", "Brand Strategy & Positioning", "Engagement Campaigns", "Community Building", "Reels & Short-Form Video"] },
  { icon: "🎨", title: "Creative & Content", items: ["Canva Graphic Design", "Video Editing", "Social Media Reels", "SEO Blog Writing", "Ad Creatives & Copywriting"] },
];

const aiTools = ["🤖 ChatGPT", "♊ Gemini", "⚡ Claude AI", "💻 Replit", "❤ Lovable", "🔧 AI Automation", "📊 Google Analytics 4", "📘 Meta Ads Manager", "🎨 Canva Pro", "🌐 WordPress", "📧 Email Marketing", "🤝 CRM Systems"];

const provenResults = [
  "12,000+ YouTube Subscribers grown organically through strategy",
  "60 Lakh+ (6M+) Views on Christian media YouTube channel",
  "Multiple successful Google & Meta Ad campaigns with positive ROI",
  "4 WordPress websites built and actively maintained",
  "High-engagement social media growth across industries",
  "Practical digital marketing training delivered at Vedanta Institute",
  "Full digital strategy executed for luxury brand Poshin.in",
  "Complete digital presence built for IT firm Mactosoft Pvt. Ltd.",
];

const services = [
  { icon: "🔍", title: "SEO Strategy", desc: "Technical, on-page, off-page & local SEO. Rank higher, get found, convert more visitors." },
  { icon: "📊", title: "Google Ads (PPC)", desc: "Search, Display & Performance Max campaigns with full conversion tracking and reporting." },
  { icon: "📘", title: "Meta Ads", desc: "Facebook & Instagram campaigns for lead generation, eCommerce sales, and brand awareness." },
  { icon: "▶", title: "YouTube Growth", desc: "Channel optimisation, YouTube SEO, thumbnail strategy, and monetisation consulting." },
  { icon: "🌐", title: "WordPress Development", desc: "Business websites, landing pages, speed optimisation, SEO setup, and CRM integration." },
  { icon: "📱", title: "Social Media Marketing", desc: "Content strategy, creative design, scheduling, and community engagement management." },
  { icon: "🤖", title: "AI Marketing Automation", desc: "AI-powered campaigns, workflow automation, CRM and email marketing integrations." },
];

const clients = [
  { icon: "👑", title: "Luxury eCommerce", desc: "Premium brand strategy, product SEO, social campaigns" },
  { icon: "💻", title: "IT Companies", desc: "B2B lead gen, website builds, ads & analytics" },
  { icon: "⛪", title: "Churches & Ministries", desc: "Social media, YouTube growth, community outreach" },
  { icon: "🎓", title: "Training Institutes", desc: "Student acquisition, ads, SEO, course promotion" },
  { icon: "🚀", title: "Startups", desc: "Full digital setup, brand positioning, growth hacking" },
  { icon: "🏪", title: "Local SMEs", desc: "Local SEO, Google Business, ads & web presence" },
  { icon: "🎵", title: "Christian Media", desc: "Lyrics platforms, YouTube channels, content strategy" },
  { icon: "🌍", title: "Global Remote Clients", desc: "Worldwide via Upwork, Fiverr & direct partnerships" },
];

const whyMe = [
  { num: "01", title: "Full Stack Expertise", desc: "One person handles SEO, ads, website, YouTube, social media, and automation. No juggling multiple agencies or freelancers." },
  { num: "02", title: "Data-Driven Only", desc: "Every decision backed by analytics. No guessing, no vanity metrics — only strategies that move your business forward." },
  { num: "03", title: "Clear Communication", desc: "Regular updates, transparent reporting, and honest conversations about what's working and what needs to change." },
  { num: "04", title: "Deadline-Committed", desc: "Your timelines are respected. I plan realistically and deliver consistently — no excuses, no delays." },
  { num: "05", title: "AI-Powered Speed", desc: "Modern AI tools let me deliver faster, more optimised work — giving your business a real competitive edge." },
  { num: "06", title: "Long-Term Partnership", desc: "I grow with my clients. Most return because I treat their business as my own and stay invested in long-term results." },
];

const platforms = [
  { icon: "🟢", title: "Upwork", desc: "Hire for hourly or fixed-price projects with full Upwork protection and verified reviews.", tag: "Available Now" },
  { icon: "🟢", title: "Fiverr", desc: "Browse ready-made gigs for SEO, Ads, WordPress, YouTube & social media marketing.", tag: "Active Seller" },
  { icon: "🌐", title: "Direct — dreambuilderss.com", desc: "Best rates and fastest turnaround for direct partnerships and ongoing monthly projects.", tag: "Best Value" },
  { icon: "💬", title: "WhatsApp / Direct Message", desc: "Fastest response for quick quotes, consultations, or to discuss your project right now.", tag: "Fastest Response" },
];

const aboutCards = [
  { icon: "🎯", title: "Mission", desc: "To empower 1,000+ businesses and students in Telangana to leverage digital marketing for real, measurable growth." },
  { icon: "💡", title: "Philosophy", desc: "I focus on ROI — traffic, leads, and revenue. Every campaign is backed by data and built around your business goals." },
  { icon: "🤝", title: "Partnership Style", desc: "Long-term thinking. Most clients return because I treat their business like my own and stay invested in outcomes." },
  { icon: "🌍", title: "Availability", desc: "Based in Secunderabad, Telangana. Available globally via Upwork, Fiverr, and direct. Remote-ready. Deadline-committed." },
];

const niches = ["Luxury eCommerce", "IT Companies", "Church & Ministry", "Christian Media", "Training Institutes", "Startups & SMEs", "Local Businesses"];

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-3">
    <div className="w-7 h-[2px] bg-primary" />
    <span className="text-xs font-semibold tracking-[3px] uppercase text-primary">{children}</span>
  </div>
);
const budgetOptions = [
  "Under ₹10,000/month",
  "₹10,000 – ₹25,000/month",
  "₹25,000 – ₹50,000/month",
  "₹50,000 – ₹1,00,000/month",
  "₹1,00,000+/month",
  "One-time project",
];

const serviceOptions = [
  "Google Ads (Search, Display, YouTube)",
  "Meta Ads (Facebook & Instagram)",
  "SEO & Organic Growth",
  "WordPress Website Development",
  "YouTube Channel Management",
  "Social Media Marketing",
  "Lead Generation Funnels",
  "AI-Powered Marketing",
  "Complete Digital Marketing Package",
  "Other / Custom Requirement",
];

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", budget: "", service: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const interest = `${formData.service}${formData.budget ? ` | Budget: ${formData.budget}` : ""}`;
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        interest,
        message: formData.message.trim() || null,
      });
      if (error) throw error;
      toast({ title: "Message sent!", description: "I'll get back to you within 24 hours." });
      setFormData({ name: "", email: "", phone: "", budget: "", service: "", message: "" });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or contact via WhatsApp.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-xl p-6 md:p-8 space-y-4">
      <h3 className="text-xl font-bold mb-2">Start a Project</h3>
      <Input placeholder="Your Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-background/10 border-background/20 text-background placeholder:text-background/40" />
      <Input type="email" placeholder="Email Address *" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-background/10 border-background/20 text-background placeholder:text-background/40" />
      <Input placeholder="Phone / WhatsApp *" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-background/10 border-background/20 text-background placeholder:text-background/40" />
      <Select value={formData.budget} onValueChange={(v) => setFormData({ ...formData, budget: v })}>
        <SelectTrigger className="bg-background/10 border-background/20 text-background [&>span]:text-background/40 data-[state=open]:text-background">
          <SelectValue placeholder="Budget Range (optional)" />
        </SelectTrigger>
        <SelectContent>{budgetOptions.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
      </Select>
      <Select value={formData.service} onValueChange={(v) => setFormData({ ...formData, service: v })}>
        <SelectTrigger className="bg-background/10 border-background/20 text-background [&>span]:text-background/40 data-[state=open]:text-background">
          <SelectValue placeholder="Service Required *" />
        </SelectTrigger>
        <SelectContent>{serviceOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
      </Select>
      <Textarea placeholder="Tell me about your project..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-background/10 border-background/20 text-background placeholder:text-background/40 min-h-[100px]" />
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : <>Send Message <Send className="w-4 h-4" /></>}
      </Button>
    </form>
  );
};

const FounderPortfolio = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center py-24 md:py-32 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(var(--primary) / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.15) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-accent/30 rounded-full text-xs font-medium tracking-widest uppercase text-accent mb-8">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Open for Projects · Worldwide Remote
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-4">
                <span className="text-gradient-primary">G.</span> Nagesh
              </h1>
              <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3">
                Full Stack Digital Marketer · Performance Strategist · WordPress Expert · YouTube Growth Specialist
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-6">
                I don't just run ads — I build complete digital ecosystems that generate traffic, leads, brand authority, and revenue for businesses serious about growth.
              </p>

              <div className="flex flex-col gap-2 mb-8 text-sm text-muted-foreground">
                <a href="tel:+919989835113" className="flex items-center gap-2 hover:text-primary transition-colors"><Phone className="w-4 h-4 text-primary" /> +91 9989835113</a>
                <a href="mailto:info@dreambuilderss.com" className="flex items-center gap-2 hover:text-primary transition-colors"><Mail className="w-4 h-4 text-primary" /> info@dreambuilderss.com</a>
                <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> www.dreambuilderss.com</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Secunderabad, Telangana, India</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild><Link to="/contact">Start a Project <ArrowRight className="w-4 h-4" /></Link></Button>
                <Button size="lg" variant="outline" asChild><Link to="/services">View Services</Link></Button>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-lg hidden lg:block">
              {stats.map((s, i) => (
                <div key={i} className={`flex items-center justify-between py-4 ${i < stats.length - 1 ? "border-b border-border" : ""}`}>
                  <span className="text-3xl font-bold text-primary tracking-wide">{s.value}</span>
                  <div className="text-right">
                    <div className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{s.label}</div>
                    <div className="text-[0.65rem] text-muted-foreground/60">{s.sub}</div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 mt-4 p-3 bg-accent/5 border border-accent/15 rounded text-xs text-muted-foreground">
                <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0 animate-pulse" />
                Currently accepting new clients — Upwork, Fiverr & direct
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="bg-primary py-3 overflow-hidden">
        <div className="flex gap-8 animate-[ticker_24s_linear_infinite] w-max">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-primary-foreground text-xs font-bold tracking-widest uppercase flex items-center gap-4 flex-shrink-0">
              {item} <span className="text-[0.45rem]">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <SectionTag>Who I Am</SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Full Stack Digital Marketer</h2>
          <p className="text-muted-foreground mb-8">Built for Real Growth</p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I am a results-driven <strong className="text-foreground">Full Stack Digital Marketer</strong> with 3+ years of hands-on experience managing SEO, Google Ads, Meta Ads, YouTube growth, WordPress development, social media strategy, and AI-powered marketing automation.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As the <strong className="text-foreground">Founder of Dreambuilderss</strong>, I've built a full-service digital marketing agency delivering measurable outcomes — not vanity metrics. I have successfully worked with luxury eCommerce brands, IT companies, churches, training institutes, startups, and SMEs.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                My unique advantage: <strong className="text-foreground">one expert handles everything</strong> — strategy, execution, reporting, and optimisation. No agency overhead. Just expertise and accountability.
              </p>
              <div className="flex flex-wrap gap-2">
                {niches.map((n) => (
                  <span key={n} className="px-3 py-1.5 border border-primary/20 text-primary text-xs font-medium tracking-wider uppercase rounded-sm hover:bg-primary/5 transition-colors">{n}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {aboutCards.map((c) => (
                <div key={c.title} className="p-5 bg-card border border-border border-l-[3px] border-l-primary rounded-sm hover:translate-x-1 transition-transform">
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-primary mb-1">{c.icon} {c.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <SectionTag>Work History</SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Professional <span className="text-gradient-primary">Experience</span></h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-border border border-border rounded-lg overflow-hidden">
            {experience.map((exp, i) => (
              <div key={i} className="bg-background p-6 hover:bg-muted/30 transition-colors group relative">
                <div className="absolute top-0 left-0 w-[3px] h-0 bg-primary group-hover:h-full transition-all duration-400" />
                <span className="text-2xl mb-3 block">{exp.icon}</span>
                <h3 className="text-lg font-bold mb-1">{exp.title}</h3>
                <p className="text-xs font-medium tracking-wider uppercase text-primary mb-3">{exp.company}</p>
                {exp.badge && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold tracking-wider uppercase rounded-sm mb-3">{exp.badge}</span>
                )}
                <ul className="space-y-1">
                  {exp.points.map((p, j) => (
                    <li key={j} className="text-sm text-muted-foreground pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-primary before:text-xs">{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Websites */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <SectionTag>Portfolio of Builds</SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Websites I <span className="text-gradient-primary">Built</span></h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {websites.map((w) => (
              <div key={w.name} className="p-6 bg-card border border-border rounded-lg hover:-translate-y-1 hover:border-primary/25 transition-all group relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <span className="text-2xl mb-3 block">{w.icon}</span>
                <h4 className="font-semibold mb-1">{w.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <SectionTag>Core Skills</SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Areas of Deep <span className="text-gradient-primary">Expertise</span></h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border border border-border rounded-lg overflow-hidden">
            {expertiseAreas.map((area) => (
              <div key={area.title} className="bg-background p-6 hover:bg-muted/30 transition-colors">
                <span className="text-2xl mb-3 block">{area.icon}</span>
                <h3 className="text-xs font-bold tracking-widest uppercase text-primary mb-4">{area.title}</h3>
                <ul className="space-y-1.5">
                  {area.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground pl-4 relative before:content-['◆'] before:absolute before:left-0 before:text-primary before:text-[0.4rem] before:top-[0.45rem]">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI + Proof */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <SectionTag>Modern Advantage</SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">AI-Powered <span className="text-gradient-primary">Marketing</span></h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I use cutting-edge AI tools to deliver faster, smarter, and more optimised marketing strategies — giving my clients a competitive edge that traditional marketers simply can't match.
              </p>
              <div className="flex flex-wrap gap-2">
                {aiTools.map((tool) => (
                  <span key={tool} className="flex items-center gap-2 px-3 py-2 border border-border rounded-sm text-sm hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all hover:-translate-y-0.5">{tool}</span>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-bold text-primary mb-6">Proven Results</h3>
              <ul className="space-y-3">
                {provenResults.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary font-bold flex-shrink-0">✔</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <SectionTag>What I Offer</SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Services for Every <span className="text-gradient-primary">Business</span></h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border border border-border rounded-lg overflow-hidden">
            {services.map((svc) => (
              <div key={svc.title} className="bg-background p-6 hover:bg-muted/30 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform" />
                <span className="text-2xl mb-3 block">{svc.icon}</span>
                <h3 className="font-semibold mb-2">{svc.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{svc.desc}</p>
              </div>
            ))}
            <div className="bg-primary/5 border border-primary/15 p-6 flex flex-col justify-center">
              <h3 className="text-lg font-bold mb-2">Need a Complete Digital Strategy?</h3>
              <p className="text-sm text-muted-foreground mb-4">One expert. Everything handled. Full accountability.</p>
              <Button size="sm" asChild><Link to="/contact">Get Free Audit → <ArrowRight className="w-3 h-3" /></Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <SectionTag>Industries Served</SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Clients I've <span className="text-gradient-primary">Worked With</span></h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {clients.map((c) => (
              <div key={c.title} className="bg-card border border-border p-6 rounded-lg text-center hover:border-primary/30 hover:-translate-y-1 transition-all">
                <span className="text-3xl mb-3 block">{c.icon}</span>
                <h4 className="font-semibold text-sm mb-1">{c.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Me */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <SectionTag>The Advantage</SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Why Clients <span className="text-gradient-primary">Choose Me</span></h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border border border-border rounded-lg overflow-hidden">
            {whyMe.map((w) => (
              <div key={w.num} className="bg-background p-8 hover:bg-muted/30 transition-colors">
                <span className="text-5xl font-bold text-primary/10 leading-none block mb-1">{w.num}</span>
                <h3 className="font-semibold mb-2">{w.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <SectionTag>Where to Hire Me</SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Find Me <span className="text-gradient-primary">Everywhere</span></h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {platforms.map((p) => (
              <div key={p.title} className="bg-card border border-border p-6 rounded-lg text-center hover:border-primary/30 hover:-translate-y-1 transition-all">
                <span className="text-3xl mb-3 block">{p.icon}</span>
                <h4 className="font-semibold mb-1">{p.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                <span className="inline-block text-[0.65rem] tracking-widest uppercase text-primary bg-primary/5 border border-primary/15 px-2 py-1 rounded-sm">{p.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA with Form */}
      <section className="py-16 md:py-24 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_50%,hsl(var(--primary)/0.08)_0%,transparent_70%)]" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to <span className="text-primary">Grow?</span></h2>
              <p className="text-lg mb-3">Let's Build Your Brand</p>
              <p className="text-background/60 mb-8">
                Whether you need your first website, want to scale your ads, grow your YouTube channel, or need complete digital management — I'm here and ready to deliver results.
              </p>
              <div className="grid grid-cols-1 gap-3 mb-8 text-sm text-background/70">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Secunderabad, Telangana, India</span>
                <a href="tel:+919989835113" className="flex items-center gap-2 hover:text-primary transition-colors"><Phone className="w-4 h-4 text-primary" /> +91 9989835113</a>
                <a href="mailto:info@dreambuilderss.com" className="flex items-center gap-2 hover:text-primary transition-colors"><Mail className="w-4 h-4 text-primary" /> info@dreambuilderss.com</a>
                <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> www.dreambuilderss.com</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10" asChild>
                  <a href="https://wa.me/919989835113?text=Hi%20Nagesh,%20I%20want%20to%20discuss%20a%20project" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
                </Button>
              </div>
            </div>

            {/* Right: Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FounderPortfolio;
