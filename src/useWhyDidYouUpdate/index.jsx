import React, { useEffect, useRef } from "react";
 

const useWhyDidYouUpdate=(name,props)=>{
  
    const prevProps=useRef();


    useEffect(()=>{

        if(prevProps.current){

          const prePropsData=prevProps.current;

           for(const preProps of prePropsData){

             

           }




        }
        prevProps.current=props;
    },[]);


}

export  default useWhyDidYouUpdate;
