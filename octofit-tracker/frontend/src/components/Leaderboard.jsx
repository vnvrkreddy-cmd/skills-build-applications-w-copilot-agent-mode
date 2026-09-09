import { useEffect, useState } from 'react'
import { API_BASE_URL, displayValue, normalizeCollection } from '../api.js'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/leaderboard/`).then((response) => {
      if (!response.ok) throw new Error(`Unable to load leaderboard (${response.status})`)
      return response.json()
    }).then((payload) => setEntries(normalizeCollection(payload, 'leaderboard'))).catch((loadError) => setError(loadError.message))
  }, [])

  return <RankedList title="Leaderboard" eyebrow="Friendly competition" description="A quick read on who is building momentum." rows={entries} error={error} />
}

function RankedList({ title, eyebrow, description, rows, error }) {
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div><span className="count-badge">{rows.length} ranked</span></div>{error && <p className="alert-message">{error}</p>}<div className="rank-list">{rows.length ? rows.map((row, index) => <div className="rank-row" key={row._id || index}><span className="rank-number">{index + 1}</span><strong>{displayValue(row.user || row.name || row.team)}</strong><span>{displayValue(row.points || row.score)} points</span></div>) : <p className="empty-state">{error ? 'The leaderboard is unavailable right now.' : 'No rankings yet.'}</p>}</div></section>
}