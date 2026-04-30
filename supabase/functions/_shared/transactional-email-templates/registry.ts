/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as contactConfirmation } from './contact-confirmation.tsx'
import { template as contactAdminAlert } from './contact-admin-alert.tsx'
import { template as enrollmentConfirmation } from './enrollment-confirmation.tsx'
import { template as enrollmentAdminAlert } from './enrollment-admin-alert.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-confirmation': contactConfirmation,
  'contact-admin-alert': contactAdminAlert,
  'enrollment-confirmation': enrollmentConfirmation,
  'enrollment-admin-alert': enrollmentAdminAlert,
}
