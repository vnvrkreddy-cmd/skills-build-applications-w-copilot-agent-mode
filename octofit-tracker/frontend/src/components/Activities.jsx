import { useEffect, useState } from 'react'
import { displayValue, fetchCollection } from '../api.js'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Movement log</p><h1>Activities</h1><p>Every run, walk, and strength session counts.</p></div><span className="count-badge">{activities.length} logged</span></div>
      {error && <p className="alert-message">{error}</p>}
      <div className="activity-grid">
        {activities.length ? activities.map((activity, index) => <article className="activity-card" key={activity._id || index}><span className="activity-type">{displayValue(activity.type)}</span><strong>{displayValue(activity.points)} points</strong><p>{displayValue(activity.durationMinutes)} minutes · {displayValue(activity.user)}</p></article>) : <p className="empty-state">{error ? 'The activity feed is unavailable right now.' : 'No activities logged yet.'}</p>}
      </div>
    </section>
  )
}