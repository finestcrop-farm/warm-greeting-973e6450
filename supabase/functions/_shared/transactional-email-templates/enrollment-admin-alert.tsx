/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  studentName?: string
  email?: string
  phone?: string
  courseTitle?: string
  amount?: number
}

const EnrollmentAdminAlertEmail = ({ studentName, email, phone, courseTitle, amount }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New enrollment: {studentName ?? 'a student'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandBar} />
        <Heading style={h1}>New Course Enrollment</Heading>
        <Text style={label}>Course</Text>
        <Text style={value}>{courseTitle ?? '—'}</Text>
        <Text style={label}>Student Name</Text>
        <Text style={value}>{studentName ?? '—'}</Text>
        <Text style={label}>Email</Text>
        <Text style={value}>{email ?? '—'}</Text>
        <Text style={label}>Phone</Text>
        <Text style={value}>{phone ?? '—'}</Text>
        <Text style={label}>Fee</Text>
        <Text style={value}>{typeof amount === 'number' ? `₹${amount.toLocaleString('en-IN')}` : '—'}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: EnrollmentAdminAlertEmail,
  subject: (data: Record<string, any>) =>
    `New enrollment: ${data?.studentName ?? 'student'} — ${data?.courseTitle ?? 'course'}`,
  displayName: 'Enrollment admin alert',
  previewData: {
    studentName: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+91 9876543210',
    courseTitle: 'AI-Driven Digital Marketing Mastery',
    amount: 14999,
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const brandBar = { height: '4px', backgroundColor: 'hsl(16, 100%, 50%)', borderRadius: '4px', marginBottom: '28px' }
const h1 = { fontSize: '22px', fontWeight: 700, color: 'hsl(220, 25%, 10%)', margin: '0 0 24px' }
const label = { fontSize: '11px', textTransform: 'uppercase' as const, fontWeight: 600, letterSpacing: '0.5px', color: 'hsl(220, 10%, 55%)', margin: '12px 0 4px' }
const value = { fontSize: '15px', color: 'hsl(220, 25%, 10%)', margin: '0 0 4px' }
