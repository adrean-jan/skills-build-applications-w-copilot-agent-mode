import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams component mounted');
    console.log('Fetching from:', codespaceUrl);

    fetch(codespaceUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Teams API Response:', data);
        const results = data.results || data;
        setTeams(Array.isArray(results) ? results : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [codespaceUrl]);

  if (loading) {
    return (
      <div className="alert alert-info fade-in" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading teams...
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger fade-in" role="alert">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="fade-in">
      <h2 className="mb-4">
        <i className="bi bi-people-fill"></i> Teams
      </h2>
      {teams.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <p className="empty-state-text">No teams available yet.</p>
        </div>
      ) : (
        <div className="row">
          {teams.map((team, idx) => (
            <div key={idx} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">
                    <i className="bi bi-shield"></i> {team.name}
                  </h5>
                  <p className="card-text text-muted">Team ID: {team.id}</p>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-sm btn-primary w-100">
                    <i className="bi bi-eye"></i> View Team
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;
