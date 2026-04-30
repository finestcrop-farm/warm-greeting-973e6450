import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MailchimpRequest {
  email: string;
  name: string;
  phone?: string;
  tags?: string[];
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("MAILCHIMP_API_KEY");
    const listId = Deno.env.get("MAILCHIMP_LIST_ID");

    if (!apiKey || !listId) {
      console.error("Missing Mailchimp configuration");
      return new Response(
        JSON.stringify({ error: "Mailchimp not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Extract datacenter from API key (e.g., us1, us2, etc.)
    const dc = apiKey.split("-").pop();
    const baseUrl = `https://${dc}.api.mailchimp.com/3.0`;

    const { email, name, phone, tags }: MailchimpRequest = await req.json();

    // Split name into first and last name
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Add or update subscriber
    const subscriberHash = await crypto.subtle
      .digest("MD5", new TextEncoder().encode(email.toLowerCase()))
      .then((hash) =>
        Array.from(new Uint8Array(hash))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("")
      );

    const memberData = {
      email_address: email,
      status_if_new: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        PHONE: phone || "",
      },
    };

    const memberResponse = await fetch(
      `${baseUrl}/lists/${listId}/members/${subscriberHash}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Basic ${btoa(`anystring:${apiKey}`)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      }
    );

    if (!memberResponse.ok) {
      const errorText = await memberResponse.text();
      console.error("Mailchimp member error:", errorText);
      throw new Error(`Failed to add member: ${memberResponse.status}`);
    }

    // Add tags if provided
    if (tags && tags.length > 0) {
      const tagData = {
        tags: tags.map((tag) => ({ name: tag, status: "active" })),
      };

      await fetch(
        `${baseUrl}/lists/${listId}/members/${subscriberHash}/tags`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa(`anystring:${apiKey}`)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tagData),
        }
      );
    }

    console.log(`Successfully added ${email} to Mailchimp`);

    return new Response(
      JSON.stringify({ success: true, message: "Added to mailing list" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Mailchimp error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
