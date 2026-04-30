-- Contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  interest TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "No public read access to contact submissions" ON public.contact_submissions FOR SELECT USING (false);

-- Courses
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  format TEXT,
  fee INTEGER NOT NULL,
  next_batch_date DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active courses" ON public.courses FOR SELECT USING (is_active = true);

-- Enrollments
CREATE TABLE public.enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  student_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create enrollments" ON public.enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own enrollments by email" ON public.enrollments FOR SELECT USING (false);
CREATE POLICY "Only service role can update enrollments" ON public.enrollments FOR UPDATE USING (false);

-- Blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT NOT NULL DEFAULT 'Dreambuilderss Team',
  category TEXT NOT NULL,
  tags TEXT[],
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts FOR SELECT USING (is_published = true);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON public.enrollments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default course
INSERT INTO public.courses (title, description, duration, format, fee, next_batch_date, is_active)
VALUES (
  'Complete Digital Marketing Course (2025-2026)',
  'Practical, job-ready training with live projects, AI tools, and personal mentoring. Online and offline batches available.',
  '2 Months',
  'Online / Offline / Hybrid',
  15000,
  '2025-11-01',
  true
);

-- Seed sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, author, category, tags, is_published, published_at)
VALUES
('10 Digital Marketing Trends to Watch in 2025','10-digital-marketing-trends-2025',
 'Discover the top digital marketing trends that will shape the industry in 2025, from AI-powered personalization to voice search optimization.',
 E'## Introduction\n\nDigital marketing is evolving rapidly. Here are the top 10 trends for 2025.\n\n### 1. AI-Powered Personalization\n### 2. Voice Search Optimization\n### 3. Video Marketing Dominance\n### 4. Privacy-First Marketing\n### 5. Influencer Marketing Evolution\n\n## Conclusion\nEmbrace these trends to stay competitive in 2025. Contact Dreambuilderss for expert guidance.',
 'Dreambuilderss Team','Digital Marketing', ARRAY['trends','AI','marketing','2025'], true, now()),
('How to Run Profitable Facebook Ads for Local Businesses','facebook-ads-local-businesses',
 'Learn step-by-step how to create and optimize Facebook ad campaigns that drive real customers to your local business.',
 E'## Why Facebook Ads Work for Local Businesses\n\nFacebook advertising remains one of the most cost-effective ways to reach local customers.\n\n### Step 1: Define Your Audience\n### Step 2: Create Compelling Offers\n### Step 3: Design Scroll-Stopping Creatives\n### Step 4: Set Up Proper Tracking\n### Step 5: Test and Optimize\n\n## Get Expert Help\nOur team at Dreambuilderss specializes in helping local businesses grow.',
 'Dreambuilderss Team','Social Media', ARRAY['Facebook','advertising','local business','social media'], true, now()),
('SEO Basics: A Complete Guide for Beginners','seo-basics-beginners-guide',
 'Master the fundamentals of Search Engine Optimization with this comprehensive beginner''s guide to ranking higher on Google.',
 E'## What is SEO?\n\nSearch Engine Optimization (SEO) is the practice of optimizing your website to rank higher in search engine results.\n\n## On-Page SEO Essentials\n### 1. Keyword Research\n### 2. Title Tags and Meta Descriptions\n### 3. Content Quality\n### 4. Internal Linking\n\n## Off-Page SEO\n### Building Backlinks\n\n## Learn SEO with Dreambuilderss\nEnroll in our digital marketing course today.',
 'Dreambuilderss Team','SEO', ARRAY['SEO','search engine','Google','beginners'], true, now());