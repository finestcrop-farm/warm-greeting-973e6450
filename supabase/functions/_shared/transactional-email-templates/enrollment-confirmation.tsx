/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Dreambuilderss'

interface Props {
  studentName?: string
  courseTitle?: string
  amount?: number
}

const EnrollmentConfirmationEmail = ({ studentName, courseTitle, amount }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your registration for {courseTitle ?? 'our course'} is confirmed</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandBar} />
        <Heading style={h1}>
          {studentName ? `You're registered, ${studentName}!` : "You're registered!"}
        </Heading>
        <Text style={text}>
          Thanks for choosing {SITE_NAME}. Here are your enrollment details:
        </Text>
        <Section style={card}>
          <Text style={cardLabel}>Course</Text>
          <Text style={cardValue}>{courseTitle ?? 'Digital Marketing Course'}</Text>
          {typeof amount === 'number' && (
            <>
              <Text style={cardLabel}>Course Fee</Text>
              <Text style={cardValue}>₹{amount.toLocaleString('en-IN')}</Text>
            </>
          )}
        </Section>
        <Text style={text}>
          Our team will reach out within 24 hours with payment details and next
          steps to secure your seat in the upcoming batch.
        </Text>
        <Text style={signoff}>
          See you soon,<br />
          The {SITE_NAME} Team
        </Text>
        <Text style={footer}>
          Questions? WhatsApp us at +91 99898 35113
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: EnrollmentConfirmationEmail,
  subject: (data: Record<string, any>) =>
    `Registration confirmed — ${data?.courseTitle ?? 'Dreambuilderss Course'}`,
  displayName: 'Enrollment confirmation',
  previewData: {
    studentName: 'Jane',
    courseTitle: 'AI-Driven Digital Marketing Mastery',
    amount: 14999,
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const brandBar = { height: '4px', backgroundColor: 'hsl(16, 100%, 50%)', borderRadius: '4px', marginBottom: '28px' }
const h1 = { fontSize: '24px', fontWeight: 700, color: 'hsl(220, 25%, 10%)', margin: '0 0 16px' }
const text = { fontSize: '15px', color: 'hsl(220, 10%, 35%)', lineHeight: '1.6', margin: '0 0 16px' }
const card = { backgroundColor: 'hsl(220, 15%, 96%)', borderRadius: '12px', padding: '20px 24px', margin: '20px 0' }
const cardLabel = { fontSize: '11px', textTransform: 'uppercase' as const, fontWeight: 600, letterSpacing: '0.5px', color: 'hsl(220, 10%, 55%)', margin: '8px 0 4px' }
const cardValue = { fontSize: '16px', fontWeight: 600, color: 'hsl(220, 25%, 10%)', margin: '0 0 4px' }
const signoff = { fontSize: '15px', color: 'hsl(220, 10%, 35%)', lineHeight: '1.6', margin: '24px 0 0' }
const footer = { fontSize: '12px', color: 'hsl(220, 10%, 55%)', margin: '32px 0 0' }
