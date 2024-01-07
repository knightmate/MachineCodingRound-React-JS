import React ,{useEffect, useState} from 'react';
 
    


const DetectCircle=({item})=>{
    
    const [circleCoordinate,setCircle]=useState([]);


    useEffect(()=>{

   console.log("Rednering Circle");
     
   const listener=document.addEventListener('click',getClickedCoordinate);


    return()=>{
        console.log("Clean up function")
         
    }

    },[])


    function getClickedCoordinate(event){
         const {clientX,clientY}=event;
         console.log("events",clientX,clientY);
        
    }

    function createCircle(x,y){

        return (
          <div style={{left:x,right:y,height:50,height:50,borderRadius:50,backgroundColor:'red'}}>
 
           
          </div>
        )

    }


    return(

        <div>
        
        </div>
    )
   

}


export default DetectCircle;

 