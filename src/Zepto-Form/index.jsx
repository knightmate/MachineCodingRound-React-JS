import React,{useEffect,useState} from "react";


//profile ,  interest  and settings
let MultiStepForm=function(props){
   
   const form= [{title:"Profile",id:1},{title:"Intrest",id:2},{title:"Settings",id:3}]
   const [selectedIndex,setSelectedIndex]=useState(0);//take default and make this customHooks
   

   const renderButton=function(){

    if(selectedIndex==form.length-1)return(
        <>
        <button>Submit</button>
        </>
    )

   }

   //Id- pre next submit
   let onClick=function(id){
   
    console.log("onClick",id)
     switch(id){
        case "pre":{
           setSelectedIndex((pre)=>pre-1)
            break;
        }
        case "next":{
            setSelectedIndex((pre)=>pre+1)
            break;
        }
        case "submit":{
            //call the submit API
            break;
        }
     }

   }
return(
    <>
    MulitStepper Form

    <div style={{display:'flex',flexDirection:'row'}}>
     {
        form.map(({title,id},index)=>{
            return(
                <div style={{cursor:'pointer'}} onClick={()=>setSelectedIndex(index)}>
                    <h2 style={{margin: '10px',background:selectedIndex===index?"yellow":""}}>{title}</h2>
                </div>
            )
        })
     }
     </div>
     {
         selectedIndex==form.length>0 && (
            <>
            <button onClick={()=>onClick("pre")}>Pre</button>
            </>
        )
     }

{
         selectedIndex<form.length-1 &&(
            <>
            <button onClick={()=>onClick("next")}>Next</button>
            </>
        )
     }
     {
         selectedIndex==form.length-1&&(
            <>
            <button onClick={()=>onClick("submit")}>Submit</button>
            </>
        )
     }
    
     
    </>
)

}
export  default MultiStepForm;