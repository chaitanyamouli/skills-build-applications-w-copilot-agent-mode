import React, { useState, useEffect } from 'react';
import { fetchFromApi, extractDataArray } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchFromApi('/workouts');
        const data = extractDataArray(response);
        setWorkouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Workouts</h2>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div className="row">
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <div key={workout._id || workout.id} className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{workout.name}</h5>
                    <p className="card-text">{workout.description}</p>
                    <p className="text-muted">
                      Duration: {workout.duration} min
                    </p>
                    <p className="text-muted">
                      Difficulty: {workout.difficulty}
                    </p>
                    <small className="text-muted">
                      Created: {new Date(workout.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">No workouts found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
