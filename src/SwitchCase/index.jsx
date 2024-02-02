import React, { cloneElement, useState,Children } from 'react';
 
const CustomSwitchComponent = ({ value ,children}) => {


    return Children.map(children, (child) => {
        // Check if the child has the desired prop
 
         
          if(child.type.name=="CustomBase"){
            if(typeof(child.props.value)=="function"){
          
                return   child.props.value(value)?child:<></>
      
              }
      
              if (child.props && child.props.value==value) {
                // Access the value prop and modify it (or do whatever you need)
                return child
              }
              return <></>
          }
   
        // If the child doesn't have the desired prop, return it as is
        return child;
      });

    const [state,setState]=useState(()=>{

        return Children.map(children, (child) => {
            // Check if the child has the desired prop
            if (child.props && child.props.value==value) {
              // Access the value prop and modify it (or do whatever you need)
              return cloneElement(<></>);
            }
      
            // If the child doesn't have the desired prop, return it as is
            return child;
          });
    })
    console.log("State",state);
  return (
    <div>
      
      {
      state
      }
    </div>
  );
};

const CustomBase = ({ value, children }) => {
  return (
    <div className="container">
      <p className="valueText">{value}</p>
      {children}
    </div>
  );
};

const SwitchCase = () => {
   
    const switchValue="Meghraj";

  return (
    <div className="appContainer">
      <CustomSwitchComponent value={switchValue} >
      <CustomBase value={switchValue}  />
      <CustomBase value={"NOvalue"}  />
      <CustomBase value={(e)=>e=="fdf"} >Mehghraj Fun</CustomBase>

      </CustomSwitchComponent>
     </div>
  );
};

export default SwitchCase;
