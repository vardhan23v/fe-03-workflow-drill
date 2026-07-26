import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const [frequency, setFrequency] = useState('weekly')
  const [saved, setSaved] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <main className="shell">
      <section className="panel">
        <div className="panel-copy">
          <p className="eyebrow">TalentDash</p>
          <h1>Alert Settings</h1>
          <p className="lead">
            Pick what kind of career updates you want to receive.
          </p>
        </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="field">
            <span>Target role</span>
            <input
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder="Frontend Engineer"
            />
          </label>

          <label className="field">
            <span>Location</span>
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Bengaluru"
            />
          </label>

          <label className="field">
            <span>Frequency</span>
            <select
              value={frequency}
              onChange={(event) => setFrequency(event.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>

          <button className="primary-button" type="submit">
            Save settings
          </button>

          {saved && (
            <p className="save-message">
              Settings saved for {email || 'your account'}.
            </p>
          )}
        </form>
      </section>
    </main>
  )
}

export default App
