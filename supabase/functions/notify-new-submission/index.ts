import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

const FALLBACK_ADMIN_EMAIL = 'info@dreambuilderss.com'

interface ContactData {
  type: 'contact'
  id: string
  name: string
  email: string
  phone: string
  interest: string
  message?: string | null
}

interface EnrollmentData {
  type: 'enrollment'
  id: string
  studentName: string
  email: string
  phone: string
  courseTitle: string
  amount: number
}

type Payload = ContactData | EnrollmentData

async function getAdminEmail(supabase: ReturnType<typeof createClient>): Promise<string> {
  // Look up the first admin user's email via auth.admin API (service role required)
  const { data: roles, error } = await supabase
    .from('user_roles')
    .select('user_id')
    .eq('role', 'admin')
    .order('created_at', { ascending: true })
    .limit(1)

  if (error || !roles || roles.length === 0) {
    return FALLBACK_ADMIN_EMAIL
  }

  // @ts-ignore - admin API is available with service role
  const { data: userResult, error: userErr } = await supabase.auth.admin.getUserById(
    roles[0].user_id as string
  )
  if (userErr || !userResult?.user?.email) {
    return FALLBACK_ADMIN_EMAIL
  }
  return userResult.user.email
}

async function sendEmail(
  supabase: ReturnType<typeof createClient>,
  templateName: string,
  recipientEmail: string,
  idempotencyKey: string,
  templateData: Record<string, unknown>,
) {
  const { error } = await supabase.functions.invoke('send-transactional-email', {
    body: {
      templateName,
      recipientEmail,
      idempotencyKey,
      templateData,
    },
  })
  if (error) {
    console.error('Failed to enqueue email', { templateName, recipientEmail, error })
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  let payload: Payload
  try {
    payload = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  if (!payload?.type || !payload?.id) {
    return new Response(JSON.stringify({ error: 'Missing type or id' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  const adminEmail = await getAdminEmail(supabase)

  if (payload.type === 'contact') {
    await Promise.all([
      sendEmail(supabase, 'contact-admin-alert', adminEmail, `contact-admin-${payload.id}`, {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        interest: payload.interest,
        message: payload.message,
      }),
      sendEmail(supabase, 'contact-confirmation', payload.email, `contact-confirm-${payload.id}`, {
        name: payload.name,
        interest: payload.interest,
      }),
    ])
  } else if (payload.type === 'enrollment') {
    await Promise.all([
      sendEmail(supabase, 'enrollment-admin-alert', adminEmail, `enroll-admin-${payload.id}`, {
        studentName: payload.studentName,
        email: payload.email,
        phone: payload.phone,
        courseTitle: payload.courseTitle,
        amount: payload.amount,
      }),
      sendEmail(supabase, 'enrollment-confirmation', payload.email, `enroll-confirm-${payload.id}`, {
        studentName: payload.studentName,
        courseTitle: payload.courseTitle,
        amount: payload.amount,
      }),
    ])
  } else {
    return new Response(JSON.stringify({ error: 'Unknown type' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
