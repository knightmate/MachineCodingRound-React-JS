 import React ,{useEffect, useState} from 'react';
 import folderSchema from '../folderSchema';
 
     
 

 const Folder=({item})=>{
     const [expand,setExpand]=useState(true);

     useEffect(()=>{

    console.log("hjiiiii")
     },[])

     if(item.isFolder){
        const temp=item.items.map((it)=>{
           return (<Folder item={it}></Folder>)
        })
        return(<div onClick={(e)=>{
            console.log(e.currentTarget);
            e.stopPropagation();
            if(e.currentTarget===e.target){
                setExpand(!expand);
            }
        }} style={{fontWeight:"bold"}}>{item.name}<div style={{display:expand?"block":"none"}}>{temp}</div></div>)
     }

     return (<div style={{marginLeft:"10px"}}>{item.name}</div>)

 }

 
 export default Folder;

  