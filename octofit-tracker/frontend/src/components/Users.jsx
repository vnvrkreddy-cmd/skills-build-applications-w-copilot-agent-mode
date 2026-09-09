import { useEffect, useState } from 'react'
import { displayValue, fetchCollection } from '../api.js'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('/api/users/', 'users').then(setUsers).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <ResourceTable
      title="Students"
      description="The people powering this season of movement."
      rows={users}
      columns={['name', 'email', 'grade']}
      error={error}
      empty="No student profiles yet."
    />
  )
}

function ResourceTable({ title, description, rows, columns, error, empty }) {
  return (
    <section className="page-section">
      <div className="section-heading">
        <div><p className="eyebrow">Directory</p><h1>{title}</h1><p>{description}</p></div>
        <span className="count-badge">{rows.length} records</span>
      </div>
      {error && <p className="alert-message">{error}</p>}
      <div className="table-wrap">
        {rows.length ? <table><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row._id || index}>{columns.map((column) => <td key={column}>{displayValue(row[column])}</td>)}</tr>)}</tbody></table> : <p className="empty-state">{error ? 'The API is unavailable right now.' : empty}</p>}
      </div>
    </section>
  )
}