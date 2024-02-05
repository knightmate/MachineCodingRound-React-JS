import React  ,{useEffect, useState,useRef} from 'react';
 
const ColorBox = () => {

    const [boxes,setBoxes]=useState([...new Array(9).fill(1)].map(()=>{
        return {id:Math.random().toString(),bgColor:'white'}
    })); 

    const [clikedBoxexId,setClickBoxIds]=useState([]);
    let intervalId=useRef(null);


    console.log("Boxed",boxes);

    useEffect(()=>{
  

        if(isAllCheck() && !intervalId.current){
  
                 
               if(intervalId.current)return ;
          
                intervalId.current=setInterval(()=>{                 
                let removeId;
                setClickBoxIds((ids)=>{

                   removeId=[...ids].shift();

                    if(!removeId){
                    clearInterval(intervalId.current);
                    intervalId.current=null
                   }

                    console.log("IDSS",removeId,ids);

                    return [...ids.filter((id)=>id!=removeId)];

                });
                createBoxes(removeId,false);

            },1000);

        };


        

    },[clikedBoxexId]);
    
    const handleClickBox=(clickedId,isClick=true)=>{
         
       createBoxes(clickedId,isClick);
       setClickBoxIds((pre)=>[...pre,clickedId]);
 

    }


    const createBoxes=(clickedId,isClick=true)=>{

        const updatedBoxes= boxes.map((box)=>{
            const bgColor_=isClick?'green':'white'
              
            if(box.id==clickedId){
                box.bgColor=bgColor_
            } 
            return box
        })
       setBoxes(updatedBoxes);
        
    }
    
    const isAllCheck=()=>{

       return  clikedBoxexId.length==boxes.length;

    }
    
    const renderBox=(bgColor="green")=>{

        return (
            <div   style={{backgroundColor:bgColor,width:'100%',height:'100px',border:'1px solid black'}}>

            </div>
        )
    }
  return (
    <div style={{width:'350px',display:'flex',gap:'10px',flexDirection:'row',flexWrap:'wrap'}}>
        {
        boxes.map(({id,bgColor},index)=>{
            
             return<div style={{width:'100px',height:'100px'}} onClick={()=>handleClickBox(id,true)}>
           { renderBox(bgColor)}
            </div>

        })
        }
     </div>
  );
};

export default ColorBox;
