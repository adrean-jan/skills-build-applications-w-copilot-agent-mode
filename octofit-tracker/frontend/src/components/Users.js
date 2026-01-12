import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Users component mounted');
    console.log('Fetching from:', codespaceUrl);

    fetch(codespaceUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Users API Response:', data);
        const results = data.results || data;
        setUsers(Array.isArray(results) ? results : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
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
        Loading users...
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
        <i className="bi bi-person-circle"></i> Users
      </h2>
      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👤</div>
          <p className="empty-state-text">No users found.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col" className="text-center">
                  <i className="bi bi-person"></i> Username
                </th>
                <th scope="col" className="text-center">
                  <i className="bi bi-envelope"></i> Email
                </th>
                <th scope="col" className="text-center">
                  <i className="bi bi-shield"></i> Team
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="align-middle">
                  <td className="text-center">
                    <span className="badge bg-primary">{user.username}</span>
                  </td>
                  <td className="text-center">
                    <a href={`mailto:${user.email}`} className="text-decoration-none">
                      {user.email}
                    </a>
                  </td>
                  <td className="text-center">
                    {user.team?.name ? (
                      <span className="badge bg-success">{user.team.name}</span>
                    ) : (
                      <span className="badge bg-secondary">No Team</span>
                    )}
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

export default Users;
