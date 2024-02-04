import React  ,{useEffect, useState} from 'react';
 
const ColorBox = () => {

    const boxes=[...new Array(9).fill(1)];
    const [clikedBoxexId,setClickBoxIds]=useState([]);
    const [clearingBoxes,setClearingBoxes]=useState(false)



    console.log("Boxed",boxes);

    useEffect(()=>{


        if(isAllCheck()){
          
            let targetIndex=0;
            const intervalId=setInterval(()=>{

                console.log("Interval started-Clearing the boxes!")
                if(!clikedBoxexId.length){
                    clearInterval(intervalId);
                    return ;
                }

             setClickBoxIds((pre)=>{

                return pre.filter((box,index)=>index!=targetIndex);

             });

             targetIndex++;


            },1000);

        };


    },[clikedBoxexId]);
    const handleClickBox=(id)=>{

         
        setClickBoxIds((pre)=>[...pre,id]);
         

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
        boxes.map((box,index)=>{
            
            const bgColor=clikedBoxexId.includes(index)?"green":'white';
            return<div style={{width:'100px',height:'100px'}} onClick={()=>handleClickBox(index)}>
           { renderBox(bgColor)}
            </div>

        })
        }
     </div>
  );
};

export default ColorBox;
