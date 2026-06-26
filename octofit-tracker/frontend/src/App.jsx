import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            🐙 OctoFit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  Workouts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div style={{ fontFamily: 'sans-serif', padding: 24 }}>
              <div className="container mt-5 text-center">
                <h1>Welcome to OctoFit Tracker</h1>
                <p className="lead">
                  Track your fitness activities and compete on the leaderboard!
                </p>
                <p className="text-muted">
                  Use the navigation menu above to explore Users, Teams,
                  Activities, Workouts, and the Leaderboard.
                </p>
                <hr />
                <div className="alert alert-info">
                  <strong>Note:</strong> This React 19 frontend requires{' '}
                  <code>VITE_CODESPACE_NAME</code> to be set in{' '}
                  <code>.env.local</code> to connect to the backend API.
                </div>
              </div>
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}
