/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Dreambuilderss'

interface Props {
  name?: string
  interest?: string
}

const ContactConfirmationEmail = ({ name, interest }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for reaching out to {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandBar} />
        <Heading style={h1}>
          {name ? `Thanks, ${name}!` : 'Thanks for reaching out!'}
        </Heading>
        <Text style={text}>
          We received your message and our team will get back to you within 24 hours
          {interest ? ` regarding your interest in ${interest}.` : '.'}
        </Text>
        <Text style={text}>
          In the meantime, feel free to explore our courses, services, and recent
          work on our website.
        </Text>
        <Text style={signoff}>
          Cheers,<br />
          The {SITE_NAME} Team
        </Text>
        <Text style={footer}>
          Need urgent help? WhatsApp us at +91 99898 35113
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: `Thanks for contacting ${SITE_NAME}`,
  displayName: 'Contact form confirmation',
  previewData: { name: 'Jane', interest: 'agency' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const brandBar = { height: '4px', backgroundColor: 'hsl(16, 100%, 50%)', borderRadius: '4px', marginBottom: '28px' }
const h1 = { fontSize: '24px', fontWeight: 700, color: 'hsl(220, 25%, 10%)', margin: '0 0 16px' }
const text = { fontSize: '15px', color: 'hsl(220, 10%, 35%)', lineHeight: '1.6', margin: '0 0 16px' }
const signoff = { fontSize: '15px', color: 'hsl(220, 10%, 35%)', lineHeight: '1.6', margin: '24px 0 0' }
const footer = { fontSize: '12px', color: 'hsl(220, 10%, 55%)', margin: '32px 0 0' }
