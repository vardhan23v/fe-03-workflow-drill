import { describe, expect, it } from 'vitest'
import {
  alertPreferencesSchema,
  defaultAlertPreferences,
  summarizeAlertPreferences,
} from './alertPreferences'

describe('alertPreferencesSchema', () => {
  it('parses a valid alert preference payload', () => {
    const result = alertPreferencesSchema.parse({
      ...defaultAlertPreferences,
      email: '  vardhan@example.com  ',
      targetRole: '  Frontend AI Engineer  ',
      minCompensationLpa: '24',
    })

    expect(result.email).toBe('vardhan@example.com')
    expect(result.targetRole).toBe('Frontend AI Engineer')
    expect(result.minCompensationLpa).toBe(24)
  })

  it('rejects invalid email and empty multi-select fields', () => {
    const result = alertPreferencesSchema.safeParse({
      ...defaultAlertPreferences,
      email: 'not-an-email',
      locations: [],
      alertTypes: [],
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join('.'))
      expect(paths).toContain('email')
      expect(paths).toContain('locations')
      expect(paths).toContain('alertTypes')
    }
  })

  it('summarizes saved preferences', () => {
    const summary = summarizeAlertPreferences({
      email: 'vardhan@example.com',
      targetRole: 'Frontend Engineer',
      locations: ['Bengaluru', 'Remote'],
      cadence: 'weekly',
      minCompensationLpa: 18,
      alertTypes: ['Salary benchmarks', 'Interview experiences'],
      anonymousSignals: true,
    })

    expect(summary).toContain('weekly alerts')
    expect(summary).toContain('Frontend Engineer')
    expect(summary).toContain('18 LPA')
  })
})
