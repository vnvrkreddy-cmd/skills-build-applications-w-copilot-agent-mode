import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">OCTOFIT <span>TRACKER</span></NavLink>
        <nav aria-label="Primary navigation">
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Students</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
        <span className="api-status">API live</span>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <footer><span>OCTOFIT / MERGINGTON HIGH</span><span>{API_BASE_URL}</span></footer>
    </div>
  )
}

function Home() {
  const navigate = useNavigate()
  const cards = [
    ['01', 'Activities', 'Log the work. See the progress.', '/activities'],
    ['02', 'Leaderboard', 'A little friendly pressure.', '/leaderboard'],
    ['03', 'Workouts', 'Your next good session.', '/workouts'],
  ]

  return <section className="home-page"><div className="hero-copy"><p className="eyebrow">PE DEPARTMENT / 2026 SEASON</p><h1>Make movement<br /><em>count.</em></h1><p className="hero-lede">OctoFit turns everyday activity into visible momentum for every student at Mergington High.</p><button type="button" className="primary-button" onClick={() => navigate('/activities')}>Open activity log <span>↗</span></button></div><div className="home-note"><span>01</span><p>Track what you do.<br />Cheer for what comes next.</p></div><div className="feature-grid">{cards.map(([number, title, copy, path]) => <NavLink className="feature-card" to={path} key={path}><span>{number}</span><h2>{title}</h2><p>{copy}</p><b>View section →</b></NavLink>)}</div></section>
}

export default App
