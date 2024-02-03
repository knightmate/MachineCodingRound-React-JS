import React, { useState } from 'react';
import "./index.css";
import { Children } from 'react/cjs/react.production.min';
 

const StepBox=({index,isCompleted,isActive})=>{

    const _value=isCompleted?"✔":index
     
    const bgColor=isActive||isCompleted?"#0066cc":'#a6abaf'
    return(
        <div style={{display:'flex',justifyContent:'center',width:'20px',height:'20px',borderRadius:'20px',backgroundColor:bgColor}}>
          <span style={{color:'white',fontSize:14,textAlign:'center'}}>{_value}</span>
        </div>
    )

}

const StepLabel=({index,label,isActive,isCompleted})=>{

    const color=isActive||isCompleted?'black':'grey'
     
    return(
    <div style={{display:'flex',alignItems:'center'}}>
        <StepBox index={index} isActive={isActive} isCompleted={isCompleted} />
       <span style={{color:color,fontSize:16,fontWeight:'500'}}> {label}</span>
    </div>)
}

const StepperComponent=({activeStep,children}) =>{

   const steppersComponent= Children.map(children,(child,index)=>{

        index=index+1;

      const isActive=index==activeStep;
      const isCompleted= index<activeStep?true:false

     if(child.type.name!=="StepLabel")return <></>

     return React.cloneElement(child,{index:index,isCompleted:isCompleted,isActive:isActive});
    
  })
    return (
        <section  style={{display:'flex',flexDirection:'row',flex:1}}>
         {
           steppersComponent.map((step,index)=>{
            index=index+1;

            const isActive=index==activeStep;
            const isCompleted= index<activeStep?true:false
            return (
                <div style={{display:'flex',flex:1,alignItems:'center'}}>
                {step}
                {index<steppersComponent.length&&isCompleted&&
                <span style={{display:'flex',margin:'5px',flex:1,height:'1px',backgroundColor:'#bdbdbd'}}></span>
                }
                </div>
            )

           })
         }
        </section>
    )


}

const Stepper = ({ children}) => {
 const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
 const [activeStep, setActiveStep] = React.useState(0);


 const handleNext = () => {
       if(activeStep >steps.length ){

        return;
       }
    setActiveStep((preActive)=>preActive+1)

  };
  const handlePrev = () => {
    setActiveStep((preActive)=>preActive-1)

  };

  const handleReset = () => {
    setActiveStep(0);
  };
   
  return (
    <div  style={{flexDirection:'column',borderRadius:'10px',margin:'30px',display:'flex',minWidth:'300px',height:'200px',border:'1px solid #E5EAF2'}}>
       <StepperComponent activeStep={activeStep}>
       {
        steps.map((step)=>{
            return  <StepLabel  label={step}></StepLabel>
        })
       }
       
       </StepperComponent>
       <div style={{display:'flex',margin:'30px',gap:'5px'}}>
       <button disabled={activeStep==0} onClick={handlePrev}>
              Back
            </button>
          <button onClick={handleNext}>
              {activeStep >steps.length ? 'Finish' : 'Next'}
            </button>
       </div>

    </div>
  );
};

export default Stepper;
