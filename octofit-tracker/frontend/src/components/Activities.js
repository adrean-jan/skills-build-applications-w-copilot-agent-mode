import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities component mounted');
    console.log('Fetching from:', codespaceUrl);

    fetch(codespaceUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Activities API Response:', data);
        const results = data.results || data;
        setActivities(Array.isArray(results) ? results : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
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
        Loading activities...
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
        <i className="bi bi-lightning-charge"></i> Activities
      </h2>
      {activities.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p className="empty-state-text">No activities found. Start logging your workouts!</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col" className="text-center">
                  <i className="bi bi-activity"></i> Type
                </th>
                <th scope="col" className="text-center">
                  <i className="bi bi-clock"></i> Duration (min)
                </th>
                <th scope="col" className="text-center">
                  <i className="bi bi-geo-alt"></i> Distance (km)
                </th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={idx} className="align-middle">
                  <td className="text-center">
                    <span className="badge bg-primary">{activity.type}</span>
                  </td>
                  <td className="text-center">{activity.duration}</td>
                  <td className="text-center">{activity.distance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Activities;
