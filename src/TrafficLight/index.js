import React, { useEffect, useState } from 'react';
import "./index.css";
import { Children } from 'react/cjs/react.production.min';
import Light from './Component/Light';


 
const TrafficLight = ({ children}) => {
    const [activeLight,setActiveLight]=useState(0);
    const interval=[4000,2000,3000];
    const intervalIndex=[1,2,0];
      
 
    useEffect(()=>{

     let current =activeLight;

     if(current>2){
        setActiveLight(0)
        return;
     }
     triggerInternal(current);
  
    },[activeLight]);


    let triggerInternal=function(index){
         
        setTimeout(()=>{
            setActiveLight(intervalIndex[index]);
        },interval[index])


    }

   console.log("activeLight",intervalIndex[activeLight]);
  return (
     <div>
        <Light color={"red"} isActive={activeLight==0}/>
        <Light color={"yellow"} isActive={activeLight==1}/>
        <Light color={"green"} isActive={activeLight==2}/>

     </div>
  );
};

export default TrafficLight;
