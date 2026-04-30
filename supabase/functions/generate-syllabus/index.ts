import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const modules = [
  {
    number: 1,
    title: "Introduction to Digital Marketing & AI",
    topics: ["Digital marketing landscape", "AI tools overview", "Career paths", "Industry trends"],
  },
  {
    number: 2,
    title: "Website & WordPress Basics",
    topics: ["Domain & hosting", "WordPress setup", "Theme customization", "Essential plugins"],
  },
  {
    number: 3,
    title: "SEO (On-Page, Off-Page, Technical)",
    topics: ["Keyword research", "On-page optimization", "Link building", "Technical SEO audits"],
  },
  {
    number: 4,
    title: "Google Ads (Search, Display, YouTube)",
    topics: ["Campaign setup", "Keyword targeting", "Ad copywriting", "Conversion tracking"],
  },
  {
    number: 5,
    title: "Meta Ads (Facebook & Instagram)",
    topics: ["Audience targeting", "Ad creative", "Lead generation", "Pixel & tracking"],
  },
  {
    number: 6,
    title: "Social Media Marketing & Content Strategy",
    topics: ["Platform strategies", "Content calendar", "Engagement tactics", "Analytics"],
  },
  {
    number: 7,
    title: "Email Marketing & Automation",
    topics: ["List building", "Email sequences", "Automation workflows", "A/B testing"],
  },
  {
    number: 8,
    title: "Analytics & Reporting (GA4, Looker Studio)",
    topics: ["GA4 setup", "Custom reports", "Dashboard creation", "Data-driven decisions"],
  },
  {
    number: 9,
    title: "Freelancing, Portfolio & Career Guidance",
    topics: ["Portfolio building", "Client acquisition", "Pricing strategies", "Interview prep"],
  },
  {
    number: 10,
    title: "Digital Ministry & Non-profit Promotion",
    topics: ["Church marketing", "YouTube for ministries", "Donor engagement", "Event promotion"],
  },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = `Create a detailed professional course syllabus for a Digital Marketing Course. For each of the following 10 modules, provide:
1. Module title and number
2. A brief overview (2-3 sentences)
3. Detailed topics covered with descriptions (expand on the provided topics)
4. Learning outcomes (3-4 bullet points)
5. Practical exercises/projects
6. Tools you'll learn

Modules:
${modules.map((m) => `Module ${m.number}: ${m.title}\nTopics: ${m.topics.join(", ")}`).join("\n\n")}

Also include:
- Course introduction section
- Prerequisites
- Who should take this course
- Course duration and schedule
- Certification details
- Career outcomes

Format this as a professional syllabus document with clear headings and structured content. Use markdown formatting.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are an expert curriculum designer specializing in digital marketing education. Create professional, detailed, and comprehensive course syllabi.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to generate syllabus");
    }

    const data = await response.json();
    const syllabusContent = data.choices?.[0]?.message?.content;

    if (!syllabusContent) {
      throw new Error("No content generated");
    }

    return new Response(
      JSON.stringify({ syllabus: syllabusContent }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating syllabus:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate syllabus" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
