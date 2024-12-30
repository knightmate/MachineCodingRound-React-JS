const Light = ({ color, isActive }) => {
    return (
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: isActive ? color : "#d3d3d3", // Use color if active, else gray
          border: "1px solid #000",
          margin: "10px",
          boxShadow: isActive ? `0 0 10px ${color}` : "none", // Add glow effect if active
        }}
      ></div>
    );
  };
  
  export default Light;
  