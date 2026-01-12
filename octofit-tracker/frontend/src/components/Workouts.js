import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Workouts component mounted');
    console.log('Fetching from:', codespaceUrl);

    fetch(codespaceUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts API Response:', data);
        const results = data.results || data;
        setWorkouts(Array.isArray(results) ? results : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
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
        Loading workouts...
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
        <i className="bi bi-dumbbell"></i> Workouts
      </h2>
      {workouts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💪</div>
          <p className="empty-state-text">No workouts available yet.</p>
        </div>
      ) : (
        <div className="row">
          {workouts.map((workout, idx) => (
            <div key={idx} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-check-circle"></i> {workout.name}
                  </h5>
                  <p className="card-text">{workout.description}</p>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-sm btn-success w-100">
                    <i className="bi bi-play"></i> Start Workout
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

export default Workouts;
