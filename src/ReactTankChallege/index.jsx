import React, { useEffect, useRef, useState } from 'react';
 
const TankChallenge =() => {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1}}>
      <h1>Tank Challenge</h1>
      <h2>How does it works?
        -Keep Pressing the Add tank button
      </h2>
      <TankContainer />
    </div> 
  );
};

const TankContainer = () => {
  const [tankHeight, setTankHeight] = useState(10);
  const   interalvalId=useRef();

  const tanksArray = new Array(3).fill().map((_, idx) => ({
    id: idx,
    height: 0,
  }));
  let intervalId;
  const [tanks,setTanks]=useState(tanksArray);
  const [buttonPressed,setButtonPressed]=useState(false);
  const [pressedButtonid,setPressedButtonId]=useState();
  const [settleOn,setSettleOn]=useState(false);
  
  const increaseHeight = (id,height) => {

       const updatedTanks=tanks.map((tank)=>{
        
        if(tank.id==id){
          tank.height=height
        }
        return tank;
       })
       setTanks(updatedTanks);

     
   };

  
   useEffect(()=>{
 
        
    if(!settleOn)return;
    setSettleOn(false)

      
    if(interalvalId.current){
      console.log("Clearing timer");

      clearInterval(interalvalId.current);
    }

    const totalTankWater = tanks.reduce((acc, tank) => acc + Number(tank.height), 0);
        
    if (totalTankWater === 0) {
      console.log("No water in tanks");
      return;
    }
    // Check if water levels are the same for all tanks
    let areWaterLevelsEqual=true;
   for(let i=0;i<tanks.length;i++){
    if(tanks[0]?.height!=tanks[i+1]?.height){
      areWaterLevelsEqual=false
    }
   }
 
  if(areWaterLevelsEqual){
    console.log("Water Level Equalsss.....");
      return;
  }
   
     
    interalvalId.current=  setInterval(()=>{
    
      setTanks((preTanks) => {

        console.log('preTanks',preTanks,areTanksEqual(preTanks))
        if(areTanksEqual(preTanks)){
          clearInterval(interalvalId.current);
          return preTanks
        }
        // Extract heights
        const temp = preTanks.map(({ height }) => height);
      
        // Redistribute water
        const updatedTanks = redistributeWaterOnce(temp, 30);
      
        // Return a new array with updated heights
        return preTanks.map((tank, index) => ({
          ...tank, // Spread the existing tank properties
          height: updatedTanks[index], // Update the height
        }));
      });
      },1000);
      
    return () => {
       
       
      //clearInterval(interalvalId.current);
  };

   },[settleOn])

   console.log("buttonPressed",buttonPressed)
   useEffect(()=>{
   
     
     if(buttonPressed){
      intervalId=setInterval(()=>{
        console.log("button pressed",pressedButtonid);
        const height=tanks[pressedButtonid].height+25;
         increaseHeight(pressedButtonid,height)
       },1000);
     }

     return ()=>clearInterval(intervalId);


   },[buttonPressed]);
  const onPressDown=(id)=>{
   /**when user press the button */
   
    setButtonPressed(true);
    setPressedButtonId(id);

  }

  const onButtonRelease=(id)=>{
    /**when use releasses the button */
     console.log('relreasex');
    setButtonPressed(false);
    //setPressedButtonId(null);
    setSettleOn(true)
   // settleTankWater()

  }

  const handleAddtank=(id)=>{
    
    increaseHeight(id,20)

  };
  const hanldeEmptyTank=(id)=>{
    const updatedTanks=tanks.map((tank)=>{
        
      if(tank.id==id){
        tank.height=0
      }
      return tank;
     })
     setTanks(updatedTanks);
     setSettleOn(true)
     setPressedButtonId(id)
    
  }

  function redistributeWaterOnce(tanks, percentage = 5) {
    const numTanks = tanks.length; // Number of tanks

    // Step 1: Calculate the amount to redistribute for each tank
    const redistribution = tanks.map(tank => tank * (percentage / 100));
 
 
    // Step 2: Calculate the total amount redistributed and distribute evenly
    const totalRedistribution = redistribution.reduce((sum, value) => sum + value, 0);
    const redistributionPerTank = totalRedistribution / numTanks;

    // Step 3: Update each tank's water level (one redistribution step)
    const updatedTanks = tanks.map((tank, index) => {
     return   tank - redistribution[index] + redistributionPerTank
    }
    );

    // Round to two decimal places for better readability
    return updatedTanks.map(tank => Math.round(tank * 100) / 100);
}
function areTanksEqual(tanks, tolerance = 0.10) {
  if (tanks.length === 0) {
    return true; // No tanks to compare
  }

  // Get the height of the first tank
  const firstHeight = tanks[0].height;

  // Check if all tank heights are approximately equal within the tolerance
  return tanks.every(tank => Math.abs(tank.height - firstHeight) <= tolerance);
}



  
   return (
    <div style={{display:'flex',gap:'10px'}}>
      {
          tanks.map(({height,id})=>{
            return(
          <div style={{display:'flex',width:'100px',flexDirection:'column'}}>
          <div style={{display:'flex',flexDirection:'column'}}>
          <button 
          style={{backgroundColor:'green',marginBottom:'5px',border:'2px solid green',borderRadius:'5px',color:'white',fontSize:14,fontWeight:'bold'}}  
          onMouseDown={()=>onPressDown(id)}
          onMouseUp={()=>onButtonRelease(id)}
          >
        Add Tank
      </button>
      <div style={{height:'10px'}}></div>
      <button 
      style={{backgroundColor:'white',marginBottom:'5px',border:'2px solid red',borderRadius:'5px',color:'red',fontSize:14,fontWeight:'bold'}}  
      onClick={()=>hanldeEmptyTank(id)}>
        Empty Tank
      </button>
            </div>
        <Tank height={height} onIncreaseHeight={()=>handleAddtank(id)} onDecreaseHeight={()=>hanldeEmptyTank(id)} />
        </div>
            )
        })
      }
  
    </div>
  );
};

 

const Tank = ({ height=0,  }) => {
  return (
     <div style={{height:'200px',display:'flex',width:'100px',border:'2px solid black',alignItems:'flex-end',borderRadius:"0 0 0.5rem 0.5rem"}}>
      <div style={{borderRadius:'2px',backgroundColor:'#48a8e8',height:`${height}%`,width:'100%',transition:'height 0.5s linear'}}></div>
     </div>
  
  );
};

export default TankChallenge;


function calculateEqualTankPercentages(totalHeight, tankCount) {
   

  const percentToSplit = totalHeight / tankCount;
 
 return  percentToSplit.toFixed(1);
 
}



function getPercentToAdd(tankheight,isClicked,noOfTank,splitedTankHeight){

  noOfTank=noOfTank-1;

  const updateTankHeightAdded=tankheight+3>splitedTankHeight?splitedTankHeight:tankheight+3
  const updateTankHeightRemoved=tankheight-3

  const validateMe=(height)=>{

    return height
    
   return height>splitedTankHeight?splitedTankHeight:height
  }
     if(isClicked ){
          if(tankheight<splitedTankHeight){
           
            if(updateTankHeightAdded>splitedTankHeight){
              return splitedTankHeight
            }

            return updateTankHeightAdded
          }
          
         const temp= updateTankHeightRemoved<splitedTankHeight?splitedTankHeight:updateTankHeightRemoved

         return validateMe(temp)
     }
     
      if(tankheight>splitedTankHeight){

        const te= tankheight-(3/noOfTank);
        console.log("debuggerme",te);
        
       const temp=  updateTankHeightRemoved<splitedTankHeight?splitedTankHeight:te
           
       return validateMe(temp)
      }
      const t=  3/noOfTank+tankheight;
      return t>splitedTankHeight?splitedTankHeight:t
 
}

