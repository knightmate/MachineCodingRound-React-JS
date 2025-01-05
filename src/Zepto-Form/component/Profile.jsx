import React from "react";
import "./Profile.css";

let Profile = function ({ age, name, updateFields }) {
  return (
    <div className="profile-container">
      
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-input"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => updateFields(e.target.value, "name")}
        />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          className="form-input"
          value={age}
          placeholder="Enter your age"
          onChange={(e) => updateFields(e.target.value, "age")}
        />
      </div>
    </div>
  );
};

export default Profile;
