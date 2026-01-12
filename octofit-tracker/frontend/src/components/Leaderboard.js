import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard component mounted');
    console.log('Fetching from:', codespaceUrl);

    fetch(codespaceUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard API Response:', data);
        const results = data.results || data;
        const sortedResults = Array.isArray(results) ? results.sort((a, b) => b.points - a.points) : [];
        setLeaderboard(sortedResults);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
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
        Loading leaderboard...
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
        <i className="bi bi-trophy"></i> Leaderboard
      </h2>
      {leaderboard.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏆</div>
          <p className="empty-state-text">No leaderboard data available yet.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col" className="text-center" style={{ width: '20%' }}>
                  <i className="bi bi-hash"></i> Rank
                </th>
                <th scope="col" className="text-center">
                  <i className="bi bi-people"></i> Team
                </th>
                <th scope="col" className="text-center">
                  <i className="bi bi-star"></i> Points
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={idx} className="align-middle">
                  <td className="text-center">
                    <span className="badge bg-warning text-dark" style={{ fontSize: '0.9rem' }}>
                      #{idx + 1}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success">{entry.team?.name || 'Unknown Team'}</span>
                  </td>
                  <td className="text-center">
                    <strong>{entry.points}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
