/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  phone?: string
  interest?: string
  message?: string
}

const ContactAdminAlertEmail = ({ name, email, phone, interest, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact form submission from {name ?? 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandBar} />
        <Heading style={h1}>New Contact Submission</Heading>
        <Text style={label}>Name</Text>
        <Text style={value}>{name ?? '—'}</Text>
        <Text style={label}>Email</Text>
        <Text style={value}>{email ?? '—'}</Text>
        <Text style={label}>Phone</Text>
        <Text style={value}>{phone ?? '—'}</Text>
        <Text style={label}>Interest</Text>
        <Text style={value}>{interest ?? '—'}</Text>
        <Hr style={hr} />
        <Text style={label}>Message</Text>
        <Text style={messageStyle}>{message || '(no message provided)'}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactAdminAlertEmail,
  subject: (data: Record<string, any>) =>
    `New contact: ${data?.name ?? 'visitor'} (${data?.interest ?? 'general'})`,
  displayName: 'Contact form admin alert',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+91 9876543210',
    interest: 'agency',
    message: 'I need help with Google Ads for my e-commerce store.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const brandBar = { height: '4px', backgroundColor: 'hsl(16, 100%, 50%)', borderRadius: '4px', marginBottom: '28px' }
const h1 = { fontSize: '22px', fontWeight: 700, color: 'hsl(220, 25%, 10%)', margin: '0 0 24px' }
const label = { fontSize: '11px', textTransform: 'uppercase' as const, fontWeight: 600, letterSpacing: '0.5px', color: 'hsl(220, 10%, 55%)', margin: '12px 0 4px' }
const value = { fontSize: '15px', color: 'hsl(220, 25%, 10%)', margin: '0 0 4px' }
const messageStyle = { fontSize: '15px', color: 'hsl(220, 25%, 10%)', lineHeight: '1.6', margin: '0', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: 'hsl(220, 15%, 90%)', margin: '20px 0' }
