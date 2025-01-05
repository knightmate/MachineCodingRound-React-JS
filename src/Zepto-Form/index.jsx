import React,{useEffect,useState} from "react";
import Profile from './component/Profile'
import Settings from "./component/Settings";
import Intrest from "./component/Intrest";
/**
 * Json
 * Name (validation for name -length 4)(required)
 * Age(18+ and Number)(required)
 * 
 */

//profile ,  interest  and settings
let MultiStepForm=function(props){
   const form= [{title:"Profile",id:0,component:<Profile age={22} name={"meghraj"}/>},{title:"Intrest",id:2,component:<Settings/>},
    {title:"Settings",id:2,component:<Settings/>}]
   const [selectedIndex,setSelectedIndex]=useState(0);//take default and make this customHooks
   
 

   console.log("selectedInex",selectedIndex);
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
   console.log('form','selectedInex',form);
return(
    <>
    MulitStepper Form
    <div style={{display:'flex',flexDirection:'row'}}>
     {
        form.map(({title,id,component},index)=>{
            return(
                <> 
                <div style={{cursor:'pointer'}} onClick={()=>setSelectedIndex(index)}>
                    <h2 style={{margin: '10px',background:selectedIndex===index?"yellow":""}}>{title}</h2>

                </div>
                </>
            
            )
        })
     }
     </div>
     {form[selectedIndex].component}
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