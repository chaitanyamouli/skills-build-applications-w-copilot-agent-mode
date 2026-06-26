import React, { useState, useEffect } from 'react';
import { fetchFromApi, extractDataArray } from '../api';

// API Endpoint: https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams
export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchFromApi('/teams');
        const data = extractDataArray(response);
        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Teams</h2>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div className="row">
          {teams.length > 0 ? (
            teams.map((team) => (
              <div key={team._id || team.id} className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{team.name}</h5>
                    <p className="card-text">{team.description}</p>
                    <p className="text-muted">
                      Members: {team.members?.length || 0}
                    </p>
                    <small className="text-muted">
                      Created: {new Date(team.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">No teams found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
