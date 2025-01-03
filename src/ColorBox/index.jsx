import React, { useEffect, useState, useRef } from "react";

const ColorBox = () => {
  const [boxes, setBoxes] = useState(
    Array.from({ length: 9 }, () => ({
      id: Math.random().toString(),
      isGreen: false,
    }))
  );
  const [clickedBoxIds, setClickedBoxIds] = useState([]);
  const intervalId = useRef(null);

  // Effect to handle resetting boxes when all are clicked
  useEffect(() => {

    if (clickedBoxIds.length === boxes.length && !intervalId.current) {
      intervalId.current = setInterval(() => {
        console.log("fdfdf")
        setClickedBoxIds((prevIds) => {    

          console.log('clickedBoxIds');

          if (prevIds.length === 0) {
            clearInterval(intervalId.current);
            intervalId.current = null;
            return prevIds;
          }
          const [removedId, ...remainingIds] = prevIds;
          updateBoxColor(removedId, false);
          return remainingIds;
        });
      }, 1000);
    }

   // return () => clearInterval(intervalId.current); // Cleanup on unmount
  }, [clickedBoxIds, boxes.length]);

  const handleBoxClick = (clickedId) => {
    if (!clickedBoxIds.includes(clickedId)) {
      setClickedBoxIds((prev) => [...prev, clickedId]);
      updateBoxColor(clickedId, true);
    }
  };

  const updateBoxColor = (id, isGreen) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === id ? { ...box, isGreen } : box
      )
    );
  };

  const renderBox = (isGreen) => (
    <div
      style={{
        backgroundColor: isGreen ? "green" : "white",
        width: "100%",
        height: "100%",
        border: "1px solid black",
      }}
    />
  );

  return (
    <div
      style={{
        width: "350px",
        display: "flex",
        gap: "10px",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {boxes.map(({ id, isGreen }) => (
        <div
          key={id}
          style={{ width: "100px", height: "100px", cursor: "pointer" }}
          onClick={() => handleBoxClick(id)}
        >
          {renderBox(isGreen)}
        </div>
      ))}
    </div>
  );
};

export default ColorBox;
