import React, { useEffect, useState } from 'react';
import Light from './Component/Light';

const TrafficLight = () => {
  const lightConfig = [
    { color: "red", duration: 4000, next: 1 },
    { color: "yellow", duration: 2000, next: 2 },
    { color: "green", duration: 3000, next: 0 },
  ];

  const [activeLight, setActiveLight] = useState(0);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setActiveLight(lightConfig[activeLight].next);
    }, lightConfig[activeLight].duration);

    return () => clearTimeout(intervalId); // Cleanup on unmount
  }, [activeLight]);

  return (
    <div>
      {lightConfig.map((light, index) => (
        <Light
          key={light.color}
          color={light.color}
          isActive={activeLight === index}
        />
      ))}
    </div>
  );
};

export default TrafficLight;
