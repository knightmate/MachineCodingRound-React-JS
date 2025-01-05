// import React,{useEffect,useState} from "react";
// import Profile from './component/Profile'
// import Settings from "./component/Settings";
// import Intrest from "./component/Intrest";
// /**
//  * Json
//  * Name (validation for name -length 4)(required)
//  * Age(18+ and Number)(required)
//  * 
//  */

// //profile ,  interest  and settings
// let MultiStepForm=function(props){
//    const form= [{title:"Profile",id:0,component:<Profile  age={22} name={"meghraj"}/>},{title:"Intrest",id:2,component:<Settings/>},
//     {title:"Settings",id:2,component:<Settings/>}]
//    const [selectedIndex,setSelectedIndex]=useState(0);//take default and make this customHooks]

 

//    console.log("selectedInex",selectedIndex);
//    //Id- pre next submit
//    let onClick=function(id){
   
//     console.log("onClick",id)
//      switch(id){
//         case "pre":{
//            setSelectedIndex((pre)=>pre-1)
//             break;
//         }
//         case "next":{
//             setSelectedIndex((pre)=>pre+1)
//             break;
//         }
//         case "submit":{
//             //call the submit API
//             break;
//         }
//      }

//    }
//    console.log('form','selectedInex',form);
// return(
//     <>
//     MulitStepper Form
//     <div style={{display:'flex',flexDirection:'row'}}>
//      {
//         form.map(({title,id,component},index)=>{
//             return(
//                 <> 
//                 <div style={{cursor:'pointer'}} onClick={()=>setSelectedIndex(index)}>
//                     <h2 style={{margin: '10px',background:selectedIndex===index?"yellow":""}}>{title}</h2>

//                 </div>
//                 </>
            
//             )
//         })
//      }
//      </div>
//      {form[selectedIndex].component}
//      {
//          selectedIndex==form.length>0 && (
//             <>
//             <button onClick={()=>onClick("pre")}>Pre</button>
//             </>
//         )
//      }

// {
//          selectedIndex<form.length-1 &&(
//             <>
//             <button onClick={()=>onClick("next")}>Next</button>
//             </>
//         )
//      }
//      {
//          selectedIndex==form.length-1&&(
//             <>
//             <button onClick={()=>onClick("submit")}>Submit</button>
//             </>
//         )
//      } 
//     </>
// )

// }
// export  default MultiStepForm;
 

import React, { useState } from "react";
import useMultiStep from './hooks/useMultiStep';
const MultiStepForm = ({ config }) => {
//   const [currentStep, setCurrentStep] = useState(0);
  const {steps,currentStep,next,pre}=useMultiStep(config.length);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  console.log("currentTab",currentStep);

  const currentTab = config[currentStep];

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateCurrentStep = () => {
    const currentErrors = {};
    currentTab.fields.forEach((field) => {
      const value = formData[field.name] || (field.type === "checkboxGroup" ? [] : "");
      const validationError = field.validation(value);
      if (validationError !== true) {
        currentErrors[field.name] = validationError;
      }
    });
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setErrors({});
     next()
    }
  };

  const handlePrevious = () => {
    setErrors({});
    pre();
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      console.log("Form Submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  const renderField = (field) => {
    const { name, label, type, options, placeholder } = field;
    const value = formData[name] || (type === "checkboxGroup" ? [] : "");

    switch (type) {
      case "text":
      case "number":
        return (
          <div key={name}>
            <label>{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => handleChange(name, e.target.value)}
            />
            {errors[name] && <p style={{ color: "red" }}>{errors[name]}</p>}
          </div>
        );

      case "select":
        return (
          <div key={name}>
            <label>{label}</label>
            <select
              value={value}
              onChange={(e) => handleChange(name, e.target.value)}
            >
              <option value="">Select</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[name] && <p style={{ color: "red" }}>{errors[name]}</p>}
          </div>
        );

      case "checkboxGroup":
        return (
          <div key={name}>
            <label>{label}</label>
            {options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="checkbox"
                    checked={value.includes(option)}
                    onChange={() => {
                      const newValue = value.includes(option)
                        ? value.filter((v) => v !== option)
                        : [...value, option];
                      handleChange(name, newValue);
                    }}
                  />
                  {option}
                </label>
              </div>
            ))}
            {errors[name] && <p style={{ color: "red" }}>{errors[name]}</p>}
          </div>
        );

      case "checkbox":
        return (
          <div key={name}>
            <label>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleChange(name, e.target.checked)}
              />
              {label}
            </label>
            {errors[name] && <p style={{ color: "red" }}>{errors[name]}</p>}
          </div>
        );

      default:
        return null;
    }
  };

   return (
    <div>
      <h2>{currentTab.tabName}</h2>
      {currentTab.fields.map(renderField)}
      <div style={{ marginTop: "20px" }}>
        {currentStep > 0 && <button onClick={handlePrevious}>Previous</button>}
        {currentStep < config.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

const formConfig = [
    {
      tabName: "Profile",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
          validation: (value) => value.trim() !== "" || "Name is required.",
        },
        {
          name: "age",
          label: "Age",
          type: "number",
          placeholder: "Enter your age",
          validation: (value) =>
            (value > 0 && value <= 120) || "Age must be between 1 and 120.",
        },
      ],
    },
    {
      tabName: "Interest",
      fields: [
        {
          name: "interest",
          label: "Favorite Hobby",
          type: "select",
          options: ["Reading", "Traveling", "Gaming", "Music"],
          validation: (value) => value !== "" || "Please select an interest.",
        },
        {
          name: "hobbies",
          label: "Hobbies",
          type: "checkboxGroup",
          options: ["Movies", "Sports", "Art", "Photography"],
          validation: (value) =>
            value.length > 0 || "At least one hobby must be selected.",
        },
      ],
    },
    {
      tabName: "Settings",
      fields: [
        {
          name: "notifications",
          label: "Enable Notifications",
          type: "checkbox",
          validation: (value) => value || "You must enable notifications.",
        },
      ],
    },
  ];
  

  export default ()=>{

    return(
        <MultiStepForm config={formConfig} />

    )
  }