import React ,{useEffect, useState} from 'react';
 
    


const DetectCircle=({item})=>{
    
    const [circleCoordinate,setCircle]=useState([]);
    const Radis=50;

console.log("circleCoordinate----refresh",circleCoordinate)

    useEffect(()=>{

   console.log("Rednering Circle");
     
   document.addEventListener('click',getClickedCoordinate);


    return()=>{
        console.log("Clean up function")
        document.removeEventListener('click',getClickedCoordinate)
         
    }

    },[])


    const  getClickedCoordinate=(event)=>{
         const {clientX,clientY}=event;
         console.log("events","x"+clientX,clientY);
         console.log("referece",circleCoordinate)
         const isOverLapping_=isOverLapping(clientX,clientY)

          console.log("isOverLapping",isOverLapping_)
 
         setCircle((pre)=>{
           return [...pre,{x:clientX,y:clientY,isOverLapping:isOverLapping_}]
         })
        
    }

    function createCircle(x,y,isOverLapping=false){

        console.log("Debuger",isOverLapping)
        const bgColor=isOverLapping?"green":'red';

         return (
          <div style={{position:'absolute',bottom:Radis/2,left:x-(Radis/2),top:y-Radis/2,height:Radis,height:Radis,borderRadius:Radis,backgroundColor:bgColor,width:50}}>
          </div>
        )

    }

    function isOverLapping(x,y){

        const tempX=x-Radis/2
        const tempY=y-Radis/2
        let circleCoordinateRef;
         
        setCircle((pre)=>{
            circleCoordinateRef=pre;
            return pre;
        })
 
         console.log("circleCoordinateRef",circleCoordinateRef)
         for(let circle of circleCoordinateRef){

            console.log("circleCoordinate@123",tempX,tempY,circle)

            if(circle.x+Radis/2>=tempX && circle.x<=tempX+Radis   && circle.y+Radis/2>=tempY && circle.y<=tempY+Radis)return true;

         }

        return false
    }


    return(

        <div>
        {
            circleCoordinate.map((circle)=>{
                const x=circle.x;
                const y=circle.y;
                return createCircle(x,y,circle.isOverLapping);

            })
        }
        </div>
    )
   

}


export default DetectCircle;

 