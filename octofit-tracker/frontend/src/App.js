import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import octofitLogo from './logo.svg';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img 
              src={octofitLogo} 
              alt="OctoFit Logo" 
              height="40"
              className="d-inline-block me-2"
            />
            OctoFit Tracker
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
                <Link className="nav-link" to="/activities">
                  <i className="bi bi-lightning-charge"></i> Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  <i className="bi bi-trophy"></i> Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  <i className="bi bi-people-fill"></i> Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <i className="bi bi-person-circle"></i> Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  <i className="bi bi-dumbbell"></i> Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
