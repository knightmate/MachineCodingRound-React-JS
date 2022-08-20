 import React ,{useState} from 'react';
 import folderSchema from '../folderSchema';
 
     
 

 const Folder=({item})=>{
     const [expand,setExpand]=useState(true);

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

 
// function temp(itemArr){

//     function recursion(item){

//         if(item.isFolder){
//             item.items.forEach((it)=>{
//                const ans= recursion(it);
              
//             });
        
//         }
//         if(item.isFolder){
//             itemArr.push({Id:item.id,hiddenChild:false})
//         }
//     }
//     recursion(folderSchema);

//     return itemArr;
   
// }

//  const Folder2 = props => {

//     const [state ,setState]=React.useState(folderSchema);
//     const [itemIds,setItemIds]=React.useState(()=>{
//        const res= temp([]);
//        console.log('response',res);
//        return res;
//     });
      
    
    
//  function renderView(item,state){
//     let renderedView;
//      if(item.isFolder){
//         renderedView=item.items.map((itm)=>{
//            let viewData=renderView(itm);
//            if(itm.isFolder){
//               return viewData;
//            }
//           return (<div>{viewData.name}</div>)
//         })
        
//      }
//      if(item.isFolder===false) return item;
//      console.log("shouldDis",itemIds);
//     return (<div id={item.id} onClick={onClick}><h3  id={item.id} style={{margin:"1px",padding:"1px"}}>{item.name}</h3><div  id={item.id}   style={{marginLeft:"10px",display:shouldDisplay(item.id)}}>{renderedView}</div></div>);
    
//  }
 
//   function shouldDisplay(id){
//       console.log("#121","id in should display",id);
//       if(Array.isArray(itemIds)){

//       for(let i=0;i<itemIds.length;i++){
//           if(itemIds[i].Id==id){

//               console.log(itemIds[i]);
//               return itemIds[i].hiddenChild?"none":"block";
//           }
//       }
//     }else{
//         return "block";
//     }
//  }
// function onClick(event){
//    const itemId=event.target.id;
    
//    event.stopPropagation();
//    event.preventDefault();
//    console.log("items id",itemId);
//    setItemIds((preState)=>{
//        console.log("PresStat",preState);
       
//       const res= preState.map((item)=>{
         
//            if(item.Id==itemId){
//             console.log("#131","itemsID",item);
//             return {
//                 Id:item.Id,hiddenChild:item.hiddenChild?false:true
//             }
             
//            }
            
//        return {
//            ...item
//         };
//        });
//        return [... res ];
//    })
// }
 

//      return (
//          <div>
//            {renderView(state)}  
//          </div>
//      );
//  };
 
