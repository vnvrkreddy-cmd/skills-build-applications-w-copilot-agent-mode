import { useEffect, useState } from 'react'
import { displayValue, normalizeCollection } from '../api.js'

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(apiBaseUrl).then((response) => {
      if (!response.ok) throw new Error(`Unable to load teams (${response.status})`)
      return response.json()
    }).then((payload) => setTeams(normalizeCollection(payload, 'teams'))).catch((loadError) => setError(loadError.message))
  }, [])

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Squad board</p><h1>Teams</h1><p>Find your people and make the next challenge social.</p></div><span className="count-badge">{teams.length} teams</span></div>{error && <p className="alert-message">{error}</p>}<div className="team-grid">{teams.length ? teams.map((team, index) => <article className="team-card" key={team._id || index}><p className="eyebrow">Team {index + 1}</p><h2>{displayValue(team.name)}</h2><p>{displayValue(team.description)}</p><strong>{displayValue(team.points || team.score)} points</strong></article>) : <p className="empty-state">{error ? 'The team board is unavailable right now.' : 'No teams created yet.'}</p>}</div></section>
}