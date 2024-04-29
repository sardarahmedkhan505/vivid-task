import React, { useState, useEffect } from 'react';

const SwapEventLogs = () => {
  const [swapEvents, setSwapEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/swapEvents')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch swap events');
        }
        return response.json();
      })
      .then((data) => {
        setSwapEvents(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Swap Event Logs</h2>
      <ul>
        {swapEvents.map((event, index) => (
          <li key={index}>
            <strong>Event Name:</strong> {event.eventName}, <strong>Timestamp:</strong> {event.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SwapEventLogs;