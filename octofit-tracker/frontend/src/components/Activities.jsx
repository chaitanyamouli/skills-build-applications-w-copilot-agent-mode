import React, { useState, useEffect } from 'react';
import { fetchFromApi, extractDataArray } from '../api';

// API Endpoint: https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities
export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchFromApi('/activities');
        const data = extractDataArray(response);
        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Activities</h2>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>User</th>
              <th>Duration (min)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.length > 0 ? (
              activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{activity._id || activity.id}</td>
                  <td>{activity.type}</td>
                  <td>{activity.userId}</td>
                  <td>{activity.duration}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No activities found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
