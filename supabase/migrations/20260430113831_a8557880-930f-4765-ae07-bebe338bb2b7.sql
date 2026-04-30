-- 1. Drop the misleading "by email" SELECT policy (it was always-false anyway,
-- but its name implied a feature that didn't exist). Keep enrollments private.
DROP POLICY IF EXISTS "Users can view their own enrollments by email" ON public.enrollments;

-- 2. Secure receipt-lookup function: requires BOTH order id AND matching email.
-- Returns only receipt-safe fields. Case-insensitive email match.
CREATE OR REPLACE FUNCTION public.lookup_enrollment_receipt(
  _order_id text,
  _email text
)
RETURNS TABLE (
  student_name text,
  email text,
  course_title text,
  amount integer,
  payment_status text,
  razorpay_order_id text,
  razorpay_payment_id text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    e.student_name,
    e.email,
    c.title AS course_title,
    e.amount,
    e.payment_status,
    e.razorpay_order_id,
    e.razorpay_payment_id,
    e.created_at
  FROM public.enrollments e
  LEFT JOIN public.courses c ON c.id = e.course_id
  WHERE e.razorpay_order_id = _order_id
    AND lower(e.email) = lower(_email)
  LIMIT 1;
$$;

-- 3. Lock down execution: only allow anon + authenticated to call (no direct table access).
REVOKE ALL ON FUNCTION public.lookup_enrollment_receipt(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.lookup_enrollment_receipt(text, text) TO anon, authenticated;