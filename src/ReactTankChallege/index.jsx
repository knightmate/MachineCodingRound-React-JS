import React, { useEffect, useRef, useState } from 'react';
 
const TankChallenge =() => {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1}}>
      <h1>Tank Challenge</h1>
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

       console.log("INcreateing height",height);

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
  
    let percentToSplit =  calculateEqualTankPercentages(totalTankWater,tanks.length)
    let percentToSplitTemp =  calculateEqualTankPercentages(totalTankWater,tanks.length)

     
   // let percentToSplit = (percentToSplit_ / 3).toFixed(1)

    const FixPercent=(percentToSplit / 3).toFixed(1);
    const FixPercentTemp=(FixPercent / 3).toFixed(1);

     console.log("percentToSplit",FixPercent,FixPercentTemp)
 
     interalvalId.current= setInterval(()=>{
      
    console.log("tanks",tanks);
        
       setTanks((tanks)=>{
         
        const updatedTanks =  tanks.map((tank) => {
            
          const tankHeight = Number(tank.height);
          const isClick=pressedButtonid==tank.id;
           const updatedLevel=getPercentToAdd(Number(tankHeight),isClick,tanks.length,Number(percentToSplitTemp))
           
           console.log("---"+updatedLevel,percentToSplitTemp);

             return {
            ...tank,
            height: updatedLevel,
          };
        });
          
        let areWaterLevelsEqual=true;
        for(let i=0;i<updatedTanks.length-1;i++){
          if(updatedTanks[0]?.height!=updatedTanks[i+1]?.height){
            areWaterLevelsEqual=false
          }
         }
            
         if(areWaterLevelsEqual){
          console.log("Stopping the Settling ,clear",interalvalId.current)
          clearInterval(interalvalId.current)
          setSettleOn(false)
        }   
        return updatedTanks
       })
 
       percentToSplit= percentToSplit-FixPercent;
      console.log("holder",percentToSplit);
   
       
    },1000);
      
    return () => {
       
       
      //clearInterval(interalvalId.current);
  };

   },[settleOn])

   useEffect(()=>{
   
     
     if(buttonPressed){
      intervalId=setInterval(()=>{
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

