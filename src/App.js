import React, { useState } from "react";
import FancyAutoComplete from "./FancyAutoCompelte";
import Cars24_folderStructure from './Cars24_folderStructure'
import schema from './folderSchema'
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


class Promise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.error = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(this.value));
      }
    };

    const reject = (error) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.error = error;
        this.onRejectedCallbacks.forEach((callback) => callback(this.error));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      const fulfilledHandler = (value) => {
        try {
          if (typeof onFulfilled === 'function') {
            const result = onFulfilled(value);
            resolve(result);
          } else {
            resolve(value);
          }
        } catch (error) {
          reject(error);
        }
      };

      const rejectedHandler = (error) => {
        try {
          if (typeof onRejected === 'function') {
            const result = onRejected(error);
            resolve(result);
          } else {
            reject(error);
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === 'fulfilled') {
        fulfilledHandler(this.value);
      } else if (this.state === 'rejected') {
        rejectedHandler(this.error);
      } else {
        this.onFulfilledCallbacks.push(fulfilledHandler);
        this.onRejectedCallbacks.push(rejectedHandler);
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    return new Promise((resolve) => {
      resolve(value);
    });
  }

  static reject(error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
}
