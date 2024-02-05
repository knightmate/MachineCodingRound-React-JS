import React, { useEffect, useRef } from "react";
 

const useWhyDidYouUpdate=(name,props)=>{
  
    const prevProps=useRef();


    useEffect(()=>{

        if(prevProps.current){

          const prePropsData=prevProps.current;
          const whyUpdate={}
           
          const keys=Object.keys(prePropsData)
           
           for(const key of keys){

            const preProps=prePropsData[key];
            const currentProps=props[key];
            if(typeof(preProps)=="object"){
             
            if(JSON.stringify(preProps)!==JSON.stringify(currentProps)){
                         
                whyUpdate[key]={
                    from:preProps,
                    currentProps:currentProps
                }
            };
            
            }
            else if(prePropsData[key]!==props[key]){
                whyUpdate[key]={
                    from:preProps,
                    currentProps:currentProps
                }
              }

           }
            
           for(const key of Object.keys(whyUpdate)){
            console.log("this got re-render",whyUpdate[key]);
          }
   
 
        }
         
        prevProps.current=props;

        

    },[name,props]);


}

export  default useWhyDidYouUpdate;
