import React, { useEffect, useState } from 'react';
 
const TankChallenge: React.FC = () => {
  return (
    <div>
      <h1>Tank Challenge</h1>
      <TankContainer />
    </div>
  );
};

const TankContainer: React.FC = () => {
  const [tankHeight, setTankHeight] = useState(10);
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
    
    setSettleOn(true)

    const totalTankWater = tanks.reduce((acc, tank) => acc + tank.height, 0);
  
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
  
    let percentToSplit =  (totalTankWater / tanks.length).toFixed(1)
    let percentToSplitTemp = (totalTankWater / tanks.length).toFixed(1)

   // let percentToSplit = (percentToSplit_ / 3).toFixed(1)

    const FixPercent=(percentToSplit / 3).toFixed(1);
    const FixPercentTemp=(FixPercent / 3).toFixed(1);

     console.log("percentToSplit",FixPercent,FixPercentTemp)
 
   const interalvalId= setInterval(()=>{
         
      
       setTanks((tanks)=>{
        const updatedTanks =  tanks.map((tank) => {
            
          const tankHeight = Number(tank.height);

          const temp7=tankHeight + parseFloat(FixPercentTemp)
          const temp= tankHeight<percentToSplitTemp?Number(temp7>percentToSplitTemp?percentToSplitTemp:temp7):tank.height
          const temp3=tankHeight - parseFloat(FixPercent)
           const clickComponentTemp=tankHeight<=percentToSplitTemp?tankHeight:Number(temp3<percentToSplitTemp?percentToSplitTemp:temp3); 
              
 
           const waterLevel=tank.id==pressedButtonid?clickComponentTemp:temp

           console.log("debugging",waterLevel);

          const tankWater =waterLevel//tank.height>percentToSplitTemp?temp2:temp;

          
                  return {
            ...tank,
            height: tankWater,
          };
        });

        let areWaterLevelsEqual=true;
        for(let i=0;i<updatedTanks.length-1;i++){
          if(updatedTanks[0]?.height!=updatedTanks[i+1]?.height){
            areWaterLevelsEqual=false
          }
         }
            
         if(areWaterLevelsEqual){
          console.log("Stopping the Settling ,clear",interalvalId)
          clearInterval(interalvalId)
          setSettleOn(false)
        }  

        return updatedTanks
       })

        
        
       percentToSplit= percentToSplit-FixPercent;
      console.log("holder",percentToSplit);
  
  
        
    },1000);
      
    return ()=>clearInterval(interalvalId);

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
   //  setButtonPressed(id)
    
  }
  const settleTankWater = (height) => {
    
 
    // const updatedTanks = tanks.map((tank) => {
    //   const tankWater = tank.height / totalTankWater;
    //   // const allocatedWater = tankWater * remainingWater;
    //   // remainingWater -= allocatedWater;
  
    //   return {
    //     ...tank,
    //     height: allocatedWater,
    //   };
    // });
  
    // setTanks(updatedTanks);

    //console.log("Updated tanks:", updatedTanks);
  };

  console.log("tanks",tanks)
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

interface TankProps {
  height: number;
  onIncreaseHeight: () => void;
  onDecreaseHeight: () => void;
}

const Tank: React.FC<TankProps> = ({ height=0,  }) => {
  return (
     <div style={{height:'200px',display:'flex',width:'100px',border:'2px solid black',alignItems:'flex-end',borderRadius:"0 0 0.5rem 0.5rem"}}>
      <div style={{backgroundColor:'pink',height:`${height}%`,width:'100%',transition:'height 1s linear'}}></div>
     </div>
  
  );
};

export default TankChallenge;
