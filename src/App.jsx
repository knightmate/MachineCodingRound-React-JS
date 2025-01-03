import React, { useCallback, useState } from "react";
import FancyAutoComplete from "./FancyAutoCompelte";
import Cars24_folderStructure from './Cars24_folderStructure'
import schema from './folderSchema'
import DetectCircle from "./DetechOverLappingCircle";
import TankChallenge from './ReactTankChallege/index';
import MultiSearch from "./MultiSearch";
import SwitchCase from "./CustomSwitch";
import Stepper from "./StepperComponent";
import ColorBox from "./ColorBox";
import Comment from "./Comment";
import CountryCapitalGame from "./CapitalGame";
import useWhyDidYouUpdate from './useWhyDidYouUpdate';
import TrafficLight from './TrafficLight';
import ProgressBar from './ProgressBar/index';
const components = [

  {
    title: "ColorBox",
    challenge:
      "",
    tags: ["Flipkart", "Google"],
    component: ColorBox
  },
  {
    title: "FancyAutoCompelte",
    challenge:
      "Implement an autocomplete feature for a text input field using JavaScript. The autocomplete should provide suggestions when the user types the @ symbol",
    tags: ["Flipkart", "Google"],
    component: FancyAutoComplete
  },
  {
    title: "Folder Structure",
    challenge:
      "Implement a folder-like structure in a React application, allowing users to navigate and interact with a hierarchical folder system. The challenge involves creating components and functionality to display and manipulate folders and files within the structure.",
    tags: ["Cars24", "Meesho"],
    component: Cars24_folderStructure
  },
  {
    title: "Detech Circle",
    challenge:
      "IMplement circle.",
    tags: ["Cars24", "Meesho"],
    component: DetectCircle
  },
  {
    title: "React Tank Challege",
    challenge:
      "tank Challege",
    tags: ["Cars24", "Meesho"],
    component: TankChallenge
  },
  {
    title: "Traffic Light",
    challenge:
      "traffic light-3",
    tags: ["Cars24", "Swiggy"],
    component: TrafficLight
  },
  {
    title: "ProgressBar ",
    challenge:
      "Progress bar",
    tags: ["Cars24", "Swiggy"],
    component: ProgressBar
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
      const Component = selectedObj.component;
      return (
        <div className="component-details">
          <h1>{selectedObj.title}</h1>
          <h3>Challenge:</h3>
          <p>{selectedObj.challenge}</p>
          <Component item={schema} tags={selectedObj.tags} />
        </div>
      );
    }
    return <p>Select a component from the list</p>;
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left: Static List */}
      <div style={{ width: "25%", borderRight: "1px solid #ccc", padding: "10px" }}>
        <h2>Components</h2>
        {components.map((component) => (
          <h3
            key={component.title}
            style={{
              cursor: "pointer",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              color: selectedComponent === component.title ? "blue" : "black"
            }}
            onClick={() => handleComponentClick(component.title)}
          >
            {component.title}
          </h3>
        ))}
      </div>

      {/* Right: Dynamic Component */}
      <div style={{ flex: 1, padding: "20px" }}>{renderComponent()}</div>
    </div>
  );
}

export default App;
