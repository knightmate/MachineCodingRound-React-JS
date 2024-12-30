import React, { useEffect, useState } from 'react';

const ProgressBar = ({
  duration = 3000,       // Total duration for the progress (in milliseconds)
  increment = 33,       // Percentage to add per interval
  interval = 1000,      // Interval duration (in milliseconds)
  onComplete = () => {}, // Callback when progress reaches 100%
  barColor = 'green',   // Progress bar color
  trackColor = 'white', // Track background color
  height = '10px',      // Height of the progress bar
  width = '140px'       // Width of the progress bar
}) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (percent >= 100) {
      onComplete(); // Call the onComplete callback when finished
      return;
    }

    const intervalId = setInterval(() => {
      setPercent((prev) => Math.min(prev + increment, 100)); // Ensure it doesn’t exceed 100
    }, interval);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [percent, increment, interval, onComplete]);

  const renderProgressBar = (completedPercent) => (
    <div
      style={{
        height,
        width,
        background: trackColor,
        border: '1px solid red',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div
        style={{
          width: `${completedPercent}%`,
          height: '100%',
          background: barColor,
          borderRadius: '4px',
          transition: 'width 0.3s ease' // Smooth transition for progress bar
        }}
      ></div>
    </div>
  );

  return (
    <div>
      {renderProgressBar(percent)}
      <p style={{ marginTop: '8px' }}>{percent}% completed</p>
    </div>
  );
};

export default ProgressBar;
