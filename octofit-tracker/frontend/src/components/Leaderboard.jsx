import React, { useState, useEffect } from 'react';
import { fetchFromApi, extractDataArray } from '../api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchFromApi('/leaderboard');
        const data = extractDataArray(response);
        setLeaderboard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Leaderboard</h2>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Points</th>
              <th>Activities</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <tr key={entry._id || entry.id}>
                  <td>
                    <strong>#{index + 1}</strong>
                  </td>
                  <td>{entry.userName || entry.userId}</td>
                  <td>{entry.teamName || entry.teamId}</td>
                  <td>{entry.points}</td>
                  <td>{entry.activityCount || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No leaderboard data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
