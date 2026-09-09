import { useEffect, useState } from 'react'
import { API_BASE_URL, displayValue, normalizeCollection } from '../api.js'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/workouts/`).then((response) => {
      if (!response.ok) throw new Error(`Unable to load workouts (${response.status})`)
      return response.json()
    }).then((payload) => setWorkouts(normalizeCollection(payload, 'workouts'))).catch((loadError) => setError(loadError.message))
  }, [])

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Coach's picks</p><h1>Workouts</h1><p>Small, focused sessions for wherever your energy is today.</p></div><span className="count-badge">{workouts.length} plans</span></div>{error && <p className="alert-message">{error}</p>}<div className="workout-grid">{workouts.length ? workouts.map((workout, index) => <article className="workout-card" key={workout._id || index}><span className="workout-mark">0{index + 1}</span><h2>{displayValue(workout.name || workout.title)}</h2><p>{displayValue(workout.description)}</p><span>{displayValue(workout.durationMinutes || workout.duration)} minutes</span></article>) : <p className="empty-state">{error ? 'Workout suggestions are unavailable right now.' : 'No workout suggestions yet.'}</p>}</div></section>
}