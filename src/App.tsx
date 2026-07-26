import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  alertPreferencesSchema,
  alertTypeOptions,
  cadenceOptions,
  defaultAlertPreferences,
  locationOptions,
  summarizeAlertPreferences,
  type AlertPreferences,
  type AlertPreferencesInput,
} from './lib/alertPreferences'

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AlertPreferencesInput, undefined, AlertPreferences>({
    resolver: zodResolver(alertPreferencesSchema),
    defaultValues: defaultAlertPreferences,
  })
  const [savedSummary, setSavedSummary] = React.useState('')

  const selectedLocations = watch('locations') || []
  const selectedTypes = watch('alertTypes') || []
  const minCompensationLpa = Number(watch('minCompensationLpa') || 0)

  const onSubmit = handleSubmit((values) => {
    setSavedSummary(summarizeAlertPreferences(values))
  })

  return (
    <main className="shell">
      <section className="panel panel-wide">
        <div className="panel-copy">
          <p className="eyebrow">TalentDash</p>
          <h1>Alert Preferences</h1>
          <p className="lead">
            Configure role, location, compensation, and signal type so the
            right career updates reach you.
          </p>
        </div>

        <div className="layout">
          <form className="settings-form" onSubmit={onSubmit} noValidate>
            <label className="field">
              <span>Email</span>
              <input
                {...register('email')}
                aria-invalid={Boolean(errors.email)}
                placeholder="you@example.com"
              />
              {errors.email && <small>{errors.email.message}</small>}
            </label>

            <label className="field">
              <span>Target role</span>
              <input
                {...register('targetRole')}
                aria-invalid={Boolean(errors.targetRole)}
                placeholder="Frontend Engineer"
              />
              {errors.targetRole && <small>{errors.targetRole.message}</small>}
            </label>

            <fieldset className="group">
              <legend>Locations</legend>
              <div className="chips">
                {locationOptions.map((location) => (
                  <label className="chip" key={location}>
                    <input type="checkbox" value={location} {...register('locations')} />
                    <span>{location}</span>
                  </label>
                ))}
              </div>
              {errors.locations && <small>{errors.locations.message}</small>}
            </fieldset>

            <div className="split">
              <label className="field">
                <span>Cadence</span>
                <select {...register('cadence')}>
                  {cadenceOptions.map((cadence) => (
                    <option key={cadence} value={cadence}>
                      {cadence}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Minimum compensation</span>
                <input
                  type="number"
                  step="1"
                  min="3"
                  max="100"
                  {...register('minCompensationLpa')}
                  aria-invalid={Boolean(errors.minCompensationLpa)}
                />
                {errors.minCompensationLpa && (
                  <small>{errors.minCompensationLpa.message}</small>
                )}
              </label>
            </div>

            <fieldset className="group">
              <legend>Alert types</legend>
              <div className="chips">
                {alertTypeOptions.map((alertType) => (
                  <label className="chip" key={alertType}>
                    <input type="checkbox" value={alertType} {...register('alertTypes')} />
                    <span>{alertType}</span>
                  </label>
                ))}
              </div>
              {errors.alertTypes && <small>{errors.alertTypes.message}</small>}
            </fieldset>

            <label className="toggle">
              <input type="checkbox" {...register('anonymousSignals')} />
              <span>Keep saved signals anonymous</span>
            </label>

            <button className="primary-button" type="submit" disabled={isSubmitting}>
              Save validated settings
            </button>
          </form>

          <aside className="summary-card">
            <p className="summary-label">Preview</p>
            <h2>{minCompensationLpa || 0} LPA floor</h2>
            <p className="summary-text">
              Locations: {selectedLocations.length ? selectedLocations.join(', ') : 'None selected'}
            </p>
            <p className="summary-text">
              Signals: {selectedTypes.length ? selectedTypes.join(', ') : 'None selected'}
            </p>
            {savedSummary ? (
              <p className="save-message">{savedSummary}</p>
            ) : (
              <p className="summary-text">
                Save to confirm a valid preference set.
              </p>
            )}
          </aside>
        </div>
      </section>
    </main>
  )
}

export default App
