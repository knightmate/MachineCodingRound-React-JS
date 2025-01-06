
import React ,{useState,useEffect}from "react";

const useMultiStep=function(steps){
 
  //  const context=React.useContext({steps:steps});
    const [selectedStep,setSelectedStep]=useState(1);
    


 const next=function(){
    
    if(selectedStep==steps)return;

    setSelectedStep((pre)=>pre+1);


 }
 const pre=function(){

    if(selectedStep==0)return;

        setSelectedStep((pre)=>pre-1);
    

 }



return {currentStep:selectedStep,steps,next,pre}

}

export default useMultiStep;
