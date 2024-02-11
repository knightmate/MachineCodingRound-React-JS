import React, { useCallback, useState } from "react";
import FancyAutoComplete from "./FancyAutoCompelte";
import Cars24_folderStructure from './Cars24_folderStructure'
import schema from './folderSchema'
 import DetectCircle from "./DetechOverLappingCircle";
 import TankChallenge from './ReactTankChallege/index'
import MultiSearch from "./MultiSearch";
import SwitchCase from "./CustomSwitch";
import Stepper from "./StepperComponent";
import ColorBox from "./ColorBox";
import Comment from "./Comment";

import CountryCapitalGame from "./CapitalGame";
import useWhyDidYouUpdate from './useWhyDidYouUpdate'
 const components = [
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
        <div>
          <h1>{selectedObj.title}</h1>
          <h3>Challenge:</h3>
          <p>{selectedObj.challenge}</p>
          <Component item={schema} tags={selectedObj.tags} />
        </div>
      );
    }
    return null;
  };
   

  const RenderHome=()=>{

    return(
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
    )
  }

  return (

     <Comment/>
  
     
     
  );
}


export default App;


 
const Counter=()=>{
const [counter,setCounter]=useState(0);
 const fn=useCallback(()=>{

 },[])
 const object={name:counter};

  return(<>
  <CounterVal name={counter} object={object}    />
   <button   onClick={()=>setCounter((pre)=>pre+1)}>
    Pree ME
    </button>
  </>)
}
const CounterVal=(props)=>{

     useWhyDidYouUpdate("Counter",props)
  
    return(<>
     <span>{props.counter}</span>
    </>)
  }