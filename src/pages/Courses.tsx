import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Laptop,
  TrendingUp,
  Bot,
  Download,
  FileText,
  Calendar,
  GraduationCap,
  Sparkles,
  Loader2,
  PlayCircle,
  Monitor,
  IndianRupee,
  Star,
  Zap,
  Shield,
  Headphones,
  BarChart3,
  Megaphone,
  Target,
  PenTool,
  Settings,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EnrollmentModal } from "@/components/EnrollmentModal";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const downloadableResources = [
  {
    title: "Complete Course Syllabus",
    description: "Detailed 10-module curriculum with topics, tools, and learning outcomes",
    icon: FileText,
    filename: "Dreambuilderss-Digital-Marketing-Syllabus.pdf",
    size: "2.4 MB",
  },
  {
    title: "Course Brochure",
    description: "Overview of the program, trainer profiles, and success stories",
    icon: BookOpen,
    filename: "Dreambuilderss-Course-Brochure.pdf",
    size: "1.8 MB",
  },
  {
    title: "Batch Schedule 2025",
    description: "Upcoming batch dates, timings, and format options",
    icon: Calendar,
    filename: "Dreambuilderss-Batch-Schedule-2025.pdf",
    size: "450 KB",
  },
  {
    title: "Career Guide & Salary Report",
    description: "Industry insights, job roles, and salary benchmarks for digital marketers",
    icon: GraduationCap,
    filename: "Digital-Marketing-Career-Guide-2025.pdf",
    size: "1.2 MB",
  },
];

interface Course {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  format: string | null;
  fee: number;
  next_batch_date: string | null;
}

const modules = [
  {
    title: "Introduction to Digital Marketing & AI",
    topics: ["Digital marketing landscape", "AI tools overview", "Career paths", "Industry trends"],
  },
  {
    title: "Website & WordPress Basics",
    topics: ["Domain & hosting", "WordPress setup", "Theme customization", "Essential plugins"],
  },
  {
    title: "SEO (On-Page, Off-Page, Technical)",
    topics: ["Keyword research", "On-page optimization", "Link building", "Technical SEO audits"],
  },
  {
    title: "Google Ads (Search, Display, YouTube)",
    topics: ["Campaign setup", "Keyword targeting", "Ad copywriting", "Conversion tracking"],
  },
  {
    title: "Meta Ads (Facebook & Instagram)",
    topics: ["Audience targeting", "Ad creative", "Lead generation", "Pixel & tracking"],
  },
  {
    title: "Social Media Marketing & Content Strategy",
    topics: ["Platform strategies", "Content calendar", "Engagement tactics", "Analytics"],
  },
  {
    title: "Email Marketing & Automation",
    topics: ["List building", "Email sequences", "Automation workflows", "A/B testing"],
  },
  {
    title: "Analytics & Reporting (GA4, Looker Studio)",
    topics: ["GA4 setup", "Custom reports", "Dashboard creation", "Data-driven decisions"],
  },
  {
    title: "Freelancing, Portfolio & Career Guidance",
    topics: ["Portfolio building", "Client acquisition", "Pricing strategies", "Interview prep"],
  },
  {
    title: "Digital Ministry & Non-profit Promotion",
    topics: ["Church marketing", "YouTube for ministries", "Donor engagement", "Event promotion"],
  },
];

const outcomes = [
  "Build and optimize WordPress websites",
  "Run profitable Google & Meta ad campaigns",
  "Rank websites on Google with SEO",
  "Create engaging social media content",
  "Use AI tools for marketing automation",
  "Analyze data and create reports",
  "Land freelance clients or full-time jobs",
  "Build a professional portfolio",
];

const careerPaths = [
  { title: "Digital Marketing Executive", salary: "₹3-5 LPA" },
  { title: "SEO Specialist", salary: "₹3-6 LPA" },
  { title: "Social Media Manager", salary: "₹3-5 LPA" },
  { title: "PPC Specialist", salary: "₹4-7 LPA" },
  { title: "Freelance Marketer", salary: "₹30-100K/month" },
  { title: "Agency Owner", salary: "Unlimited" },
];

const faqs = [
  {
    question: "Who is this course suitable for?",
    answer:
      "This course is perfect for students, job seekers, working professionals looking to switch careers, business owners wanting to learn marketing, freelancers, and anyone interested in digital marketing including pastors and ministry leaders.",
  },
  {
    question: "Do I need any technical background?",
    answer:
      "No technical background is required. Basic computer knowledge and willingness to learn is all you need. We start from the fundamentals and build up.",
  },
  {
    question: "What is the course format?",
    answer:
      "We offer online, offline (in Hyderabad), and hybrid options. Live sessions, recorded materials, assignments, and live project work are included in all formats.",
  },
  {
    question: "Will I get a certificate?",
    answer:
      "Yes, you'll receive a course completion certificate. Additionally, we guide you to get Google and Meta certifications during the course.",
  },
  {
    question: "Is placement assistance provided?",
    answer:
      "Yes! We provide resume building, portfolio development, interview preparation, and job referrals to our hiring partners.",
  },
  {
    question: "What about live projects?",
    answer:
      "You'll work on real client projects from our agency, giving you hands-on experience that you can showcase in your portfolio.",
  },
  {
    question: "Can I pay in installments?",
    answer:
      "Yes, we offer flexible payment options. Contact us to discuss installment plans that work for you.",
  },
];

const Courses = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<{
    title: string;
    filename: string;
  } | null>(null);
  const [isGeneratingSyllabus, setIsGeneratingSyllabus] = useState(false);
  const [generatedSyllabus, setGeneratedSyllabus] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        setCourse(data);
      }
      setLoading(false);
    };

    fetchCourse();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Coming Soon";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDownloadClick = (title: string, filename: string) => {
    setSelectedResource({ title, filename });
    setShowLeadModal(true);
  };

  const handleGenerateSyllabus = async () => {
    setIsGeneratingSyllabus(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-syllabus");
      
      if (error) throw error;
      
      if (data?.syllabus) {
        setGeneratedSyllabus(data.syllabus);
        toast.success("Syllabus generated! Scroll down to view it.");
      }
    } catch (error) {
      console.error("Error generating syllabus:", error);
      toast.error("Failed to generate syllabus. Please try again.");
    } finally {
      setIsGeneratingSyllabus(false);
    }
  };
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-secondary/10 via-background to-accent/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-6">
              <Bot className="h-4 w-4" />
              <span>AI-Driven Curriculum</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Master <span className="text-gradient-accent">Digital Marketing</span> in 2 Months
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Practical, job-ready training with live projects, AI tools, and personal mentoring. 
              Online and offline batches available.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">{course?.duration || "2 Months"}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
                <Laptop className="h-5 w-5 text-secondary" />
                <span className="font-medium">{course?.format || "Online / Offline / Hybrid"}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
                <Award className="h-5 w-5 text-accent" />
                <span className="font-medium">Certificate Included</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="heroSecondary" 
                size="lg" 
                onClick={() => course && setShowEnrollModal(true)}
                disabled={!course}
              >
                Enroll Now - ₹{course?.fee?.toLocaleString("en-IN") || "15,000"}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => handleDownloadClick("Complete Course Syllabus", "Dreambuilderss-Digital-Marketing-Syllabus.pdf")}
              >
                <Download className="h-5 w-5" />
                Download Syllabus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8">Course Modules</h2>
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <Accordion key={module.title} type="single" collapsible>
                    <AccordionItem value={`module-${index}`} className="border border-border rounded-xl px-6">
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-center gap-4">
                          <span className="shrink-0 w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-sm font-semibold text-secondary">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="font-semibold">{module.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-12 space-y-2">
                          {module.topics.map((topic) => (
                            <li key={topic} className="flex items-center gap-2 text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-semibold text-lg mb-4">Course Highlights</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary shrink-0" />
                      <span>Duration: {course?.duration || "2 Months"}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary shrink-0" />
                      <span>10 Comprehensive Modules</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary shrink-0" />
                      <span>Small Batch Size (Max 15)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-primary shrink-0" />
                      <span>Industry Certificate</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-primary shrink-0" />
                      <span>Placement Assistance</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary to-accent text-secondary-foreground">
                  <p className="text-sm font-medium mb-2">Next Batch Starts</p>
                  <p className="text-2xl font-bold mb-4">{formatDate(course?.next_batch_date || null)}</p>
                  <p className="text-3xl font-bold mb-4">₹{course?.fee?.toLocaleString("en-IN") || "15,000"}</p>
                  <Button 
                    className="w-full bg-background text-secondary hover:bg-background/90"
                    onClick={() => course && setShowEnrollModal(true)}
                    disabled={!course}
                  >
                    Reserve Your Seat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient-accent">Download</span> Resources
            </h2>
            <p className="text-lg text-muted-foreground">
              Get detailed information about our course, schedule, and career opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {downloadableResources.map((resource) => (
              <div
                key={resource.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-secondary/30 hover:shadow-soft transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <resource.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{resource.size}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-secondary hover:text-secondary"
                    onClick={() => handleDownloadClick(resource.title, resource.filename)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* AI Syllabus Generator */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
                  <Sparkles className="h-4 w-4" />
                  AI-Powered
                </div>
                <h3 className="text-xl font-bold mb-2">Generate Detailed Syllabus with AI</h3>
                <p className="text-muted-foreground">
                  Get an AI-generated comprehensive syllabus with detailed module descriptions, learning outcomes, and practical exercises.
                </p>
              </div>
              <Button 
                size="lg" 
                onClick={handleGenerateSyllabus}
                disabled={isGeneratingSyllabus}
                className="shrink-0"
              >
                {isGeneratingSyllabus ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Syllabus
                  </>
                )}
              </Button>
            </div>

            {generatedSyllabus && (
              <div className="mt-8 p-6 rounded-xl bg-card border border-border max-h-[600px] overflow-y-auto">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {generatedSyllabus}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Learn</h2>
            <p className="text-lg text-muted-foreground">Skills that make you job-ready and industry-relevant.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
              >
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Career Paths After Course</h2>
            <p className="text-lg text-muted-foreground">Multiple opportunities await after completion.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {careerPaths.map((career) => (
              <div
                key={career.title}
                className="p-6 rounded-2xl bg-card border border-border text-center hover:border-secondary/20 hover:shadow-soft transition-all duration-300"
              >
                <TrendingUp className="h-8 w-8 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{career.title}</h3>
                <p className="text-sm text-accent font-medium">{career.salary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Benefits */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Bot className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              AI-Powered Learning Experience
            </h2>
            <p className="text-lg text-background/70 mb-8">
              Our curriculum integrates the latest AI tools to give you a competitive edge. 
              Learn to use ChatGPT, AI content generators, automation tools, and AI-powered 
              analytics for smarter, faster marketing.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["ChatGPT for Content", "AI Image Tools", "Automation Workflows", "AI Analytics", "Predictive Insights"].map(
                (tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 bg-background/10 rounded-full text-sm font-medium"
                  >
                    {tool}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Recorded Video Classes ═══ */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <PlayCircle className="h-4 w-4" />
              <span>Self-Paced Learning</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recorded <span className="text-gradient-accent">Video Classes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn at your own pace with professionally produced video courses. Lifetime access, downloadable resources, and certificate included.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Fundamentals */}
            <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Marketing Fundamentals</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Master the core concepts of digital marketing — from SEO basics to social media strategy, content planning, and analytics foundations.
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-primary">₹2,999</span>
                <span className="text-sm text-muted-foreground line-through">₹5,999</span>
              </div>
              <ul className="space-y-2.5 mb-8 text-sm">
                {["8 Modules, 45+ Video Lessons", "Duration: 20+ Hours", "SEO, Social Media, Content Marketing", "Google Analytics & Search Console", "Assignments & Quizzes", "Lifetime Access + Updates", "Certificate of Completion"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" onClick={() => course && setShowEnrollModal(true)}>
                Enroll Now <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Ads Mastery — Featured */}
            <div className="group relative p-8 rounded-2xl bg-card border-2 border-secondary shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full uppercase tracking-wider">Most Popular</span>
              </div>
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <Target className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Google & Meta Ads Mastery</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Deep-dive into paid advertising across Google Search, Display, YouTube, Facebook & Instagram. Learn campaign setup to advanced optimization.
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-secondary">₹4,999</span>
                <span className="text-sm text-muted-foreground line-through">₹9,999</span>
              </div>
              <ul className="space-y-2.5 mb-8 text-sm">
                {["12 Modules, 60+ Video Lessons", "Duration: 30+ Hours", "Google Ads: Search, Display, YouTube", "Meta Ads: Facebook & Instagram", "Remarketing & Lookalike Audiences", "Conversion Tracking & Pixel Setup", "Live Campaign Walkthroughs", "Lifetime Access + Updates", "Certificate of Completion"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="heroSecondary" className="w-full" onClick={() => course && setShowEnrollModal(true)}>
                Enroll Now <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* AI Marketing */}
            <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-soft transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Bot className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Marketing & Automation</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Harness AI tools for content creation, campaign automation, predictive analytics, and customer journey optimization.
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-accent">₹3,999</span>
                <span className="text-sm text-muted-foreground line-through">₹7,999</span>
              </div>
              <ul className="space-y-2.5 mb-8 text-sm">
                {["10 Modules, 50+ Video Lessons", "Duration: 25+ Hours", "ChatGPT & AI Content Tools", "Email & Social Media Automation", "AI-Powered Ad Optimization", "Predictive Analytics & Insights", "Workflow Automation (Zapier, Make)", "Lifetime Access + Updates", "Certificate of Completion"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" onClick={() => course && setShowEnrollModal(true)}>
                Enroll Now <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Live Online Training Programs ═══ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              <Monitor className="h-4 w-4" />
              <span>Instructor-Led Training</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Live Online <span className="text-gradient-accent">Training Programs</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              High-intensity, mentor-led programs with live classes, real projects, and career support. Limited seats per batch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pro Program */}
            <div className="group relative p-8 rounded-2xl bg-card border-2 border-secondary shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-3 left-6">
                <span className="px-4 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Star className="h-3 w-3" /> Best for Careers
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 mt-2">Digital Marketing Pro Program</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Comprehensive 3-month intensive training to become a certified digital marketing professional with job-ready skills.
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-secondary">₹14,999</span>
                <span className="text-muted-foreground text-sm">/ 3 months</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/50">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span>3 Months Duration</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/50">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  <span>5 Days/Week Live</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/50">
                  <Users className="h-4 w-4 text-primary shrink-0" />
                  <span>Max 15 Per Batch</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/50">
                  <Briefcase className="h-4 w-4 text-primary shrink-0" />
                  <span>Placement Support</span>
                </div>
              </div>

              <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">What's Included</h4>
              <ul className="space-y-2 mb-6 text-sm">
                {[
                  "All 10 Modules (SEO to AI Tools)",
                  "Live Projects with Real Clients",
                  "1-on-1 Mentorship Sessions",
                  "Google & Meta Certification Prep",
                  "Portfolio & Resume Building",
                  "Interview Prep & Job Referrals",
                  "Lifetime Community Access",
                  "Recorded Session Backups",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">Tools You'll Master</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Google Ads", "Meta Ads", "GA4", "SEMrush", "Canva", "Mailchimp", "ChatGPT", "WordPress"].map((tool) => (
                  <span key={tool} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">{tool}</span>
                ))}
              </div>

              <Button variant="heroSecondary" className="w-full" size="lg" onClick={() => course && setShowEnrollModal(true)}>
                Enroll Now <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Business Owner Bootcamp */}
            <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300">
              <div className="absolute -top-3 left-6">
                <span className="px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Zap className="h-3 w-3" /> For Business Owners
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 mt-2">Business Owner Bootcamp</h3>
              <p className="text-muted-foreground text-sm mb-4">
                A focused 6-week program designed for entrepreneurs and business owners to take control of their digital marketing.
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-primary">₹9,999</span>
                <span className="text-muted-foreground text-sm">/ 6 weeks</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/50">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span>6 Weeks Intensive</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/50">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  <span>3 Sessions/Week</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/50">
                  <Users className="h-4 w-4 text-primary shrink-0" />
                  <span>Max 10 Per Batch</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/50">
                  <Headphones className="h-4 w-4 text-primary shrink-0" />
                  <span>Priority Support</span>
                </div>
              </div>

              <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">What's Included</h4>
              <ul className="space-y-2 mb-6 text-sm">
                {[
                  "Google & Meta Ads for Your Business",
                  "Local SEO & Google Business Profile",
                  "Social Media Strategy & Content",
                  "Lead Generation Funnels",
                  "Marketing Budget Optimization",
                  "AI Tools for Business Marketing",
                  "Direct Work on Your Business",
                  "30-Day Post-Course Support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">Perfect For</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Startup Founders", "Shop Owners", "Freelancers", "Restaurant/Cafe", "Coaches", "NGOs"].map((item) => (
                  <span key={item} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">{item}</span>
                ))}
              </div>

              <Button variant="hero" className="w-full" size="lg" onClick={() => course && setShowEnrollModal(true)}>
                Enroll Now <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Book Our Services (Done-For-You) ═══ */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              <Settings className="h-4 w-4" />
              <span>Done-For-You Marketing</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Book Our <span className="text-gradient-accent">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let our expert team handle your digital marketing while you focus on running your business. Monthly plans with transparent pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Megaphone className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-1">Starter</h3>
              <p className="text-muted-foreground text-sm mb-4">For small businesses starting their digital journey</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold text-primary">₹15,000</span>
                <span className="text-muted-foreground text-sm">/ month</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6 flex items-center gap-1">
                <IndianRupee className="h-3 w-3" />
                Recommended ad spend: ₹10K–20K/month
              </p>
              <ul className="space-y-2.5 mb-8 text-sm">
                {[
                  "Social Media Management (2 platforms)",
                  "8 Posts/Month + Stories",
                  "Basic SEO Setup & Optimization",
                  "Google Business Profile Management",
                  "Monthly Performance Report",
                  "Email & Chat Support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/contact">Get Started <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>

            {/* Accelerator — Best Value */}
            <div className="group relative p-8 rounded-2xl bg-card border-2 border-secondary shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Star className="h-3 w-3" /> Best Value
                </span>
              </div>
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <BarChart3 className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-1">Accelerator</h3>
              <p className="text-muted-foreground text-sm mb-4">For growing businesses ready to scale aggressively</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold text-secondary">₹35,000</span>
                <span className="text-muted-foreground text-sm">/ month</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6 flex items-center gap-1">
                <IndianRupee className="h-3 w-3" />
                Recommended ad spend: ₹25K–50K/month
              </p>
              <ul className="space-y-2.5 mb-8 text-sm">
                {[
                  "Everything in Starter, plus:",
                  "Social Media (3 platforms) — 16 Posts/Month",
                  "Google Ads Management & Optimization",
                  "Meta Ads (Facebook & Instagram) Management",
                  "Advanced SEO (On-Page + Off-Page)",
                  "Content Calendar & Strategy",
                  "Bi-Weekly Strategy Calls",
                  "Lead Generation Campaigns",
                  "Dedicated Account Manager",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="heroSecondary" className="w-full" asChild>
                <Link to="/contact">Get Started <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>

            {/* Enterprise */}
            <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-soft transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Shield className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-1">Enterprise</h3>
              <p className="text-muted-foreground text-sm mb-4">For established businesses needing full-stack marketing</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold text-accent">₹75,000</span>
                <span className="text-muted-foreground text-sm">/ month</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6 flex items-center gap-1">
                <IndianRupee className="h-3 w-3" />
                Recommended ad spend: ₹50K–2L/month
              </p>
              <ul className="space-y-2.5 mb-8 text-sm">
                {[
                  "Everything in Accelerator, plus:",
                  "All Social Platforms — Unlimited Posts",
                  "YouTube Channel Management & Video SEO",
                  "Email Marketing & Automation Sequences",
                  "Landing Page Design & A/B Testing",
                  "Conversion Rate Optimization (CRO)",
                  "AI-Powered Campaign Optimization",
                  "Weekly Strategy Calls & Reporting",
                  "Custom Dashboard (Looker Studio)",
                  "Priority WhatsApp Support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/contact">Contact Us <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            * Ad spend is paid directly to Google/Meta. All plans require a minimum 3-month commitment. Custom plans available on request.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-border rounded-xl px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-secondary via-secondary to-accent text-secondary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Digital Marketing Journey Today
            </h2>
            <p className="text-lg text-secondary-foreground/80 mb-8">
              Join the next batch and transform your career with practical, AI-driven training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                className="bg-background text-secondary hover:bg-background/90"
                asChild
              >
                <Link to="/contact">
                  Enroll Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
                asChild
              >
                <a
                  href="https://wa.me/919876543210?text=Hi%20Dreambuilderss,%20I'm%20interested%20in%20the%20digital%20marketing%20course"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp for Details
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      {course && (
        <EnrollmentModal
          course={course}
          isOpen={showEnrollModal}
          onClose={() => setShowEnrollModal(false)}
        />
      )}

      {/* Lead Capture Modal */}
      {selectedResource && (
        <LeadCaptureModal
          open={showLeadModal}
          onOpenChange={setShowLeadModal}
          resourceTitle={selectedResource.title}
          resourceFilename={selectedResource.filename}
        />
      )}
    </Layout>
  );
};

export default Courses;
