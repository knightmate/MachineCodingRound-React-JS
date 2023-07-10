import React, { useState } from "react";
import FancyAutoComplete from "./FancyAutoCompelte";
import Cars24_folderStructure from './Cars24_folderStructure'

const components = [
  {
    title: "FancyAutoCompelte",
    challenge:
      "Implement an autocomplete feature for a text input field using JavaScript. The autocomplete should provide suggestions when the user types the @ symbol",
    tags: ["Flipkart", "Google"]
  },
  {
    title: "Folder Structure",
    challenge:
      "Implement a folder-like structure in a React application, allowing users to navigate and interact with a hierarchical folder system. The challenge involves creating components and functionality to display and manipulate folders and files within the structure.",
    tags: ["Cars24", "Meesho"]
  },
  // Add more objects for other components
];

function App() {
  const [selectedComponent, setSelectedComponent] = useState("");

  const handleComponentClick = (title) => {
    setSelectedComponent(title);
  };

  const renderComponent = () => {
    const selectedObj = components.find((c) => c.title === selectedComponent);
    if (selectedObj) {
      return (
        <div >
          <h1>{selectedObj.title}</h1>
          <h3>Challenge:</h3>
          <p>{selectedObj.challenge}</p>
          <FancyAutoComplete tags={selectedObj.tags} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="App">
      <div className="component-list">
        {components.map((component) => (
          <h2
            key={component.title}
            style={{ cursor: "pointer" }}
            onClick={() => handleComponentClick(component.title)}
          >
            {component.title}
          </h2>
        ))}
      </div>

      <div className="component-details">
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;
