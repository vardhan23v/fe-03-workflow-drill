import { z } from 'zod'

export const cadenceOptions = ['daily', 'weekly', 'monthly'] as const
export const locationOptions = [
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Remote',
] as const
export const alertTypeOptions = [
  'Salary benchmarks',
  'Interview experiences',
  'Company reviews',
  'Job openings',
] as const

export const alertPreferencesSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  targetRole: z
    .string()
    .trim()
    .min(2, 'Target role must be at least 2 characters')
    .max(60, 'Target role must be 60 characters or less'),
  locations: z
    .array(z.enum(locationOptions))
    .min(1, 'Choose at least one location'),
  cadence: z.enum(cadenceOptions),
  minCompensationLpa: z
    .coerce
    .number()
    .min(3, 'Minimum compensation must be at least 3 LPA')
    .max(100, 'Minimum compensation must stay at 100 LPA or below'),
  alertTypes: z
    .array(z.enum(alertTypeOptions))
    .min(1, 'Choose at least one alert type'),
  anonymousSignals: z.boolean(),
})

export type AlertPreferencesInput = z.input<typeof alertPreferencesSchema>
export type AlertPreferences = z.output<typeof alertPreferencesSchema>

export const defaultAlertPreferences: AlertPreferencesInput = {
  email: '',
  targetRole: 'Frontend Engineer',
  locations: ['Bengaluru', 'Remote'],
  cadence: 'weekly',
  minCompensationLpa: 18,
  alertTypes: ['Salary benchmarks', 'Interview experiences'],
  anonymousSignals: true,
}

export function summarizeAlertPreferences(values: AlertPreferences): string {
  return `${values.cadence} alerts for ${values.targetRole} in ${values.locations.join(', ')} from ${values.minCompensationLpa} LPA.`
}
