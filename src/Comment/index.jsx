import React, { useState } from 'react';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';



const Comment = ({ onSubmit }) => {

  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState();
  const [commentItem, setCommentItem] = useState([]);
  const [commentTree,setCommentTree]=useState({
    id:1,
    item:[{id:3,item:[],value:"Good Product"},{id:4,item:[],value:"Not Product"},{id:5,item:[],value:"Great Product"}]
  });

  const getEdited=(nodes,id,value)=>{

      if(nodes.id==id){
        const tempNode={...nodes,value:value}
         return tempNode
     };

     const updatedNodes={...nodes};
     let items=[]
      
     for(let i=0;i<nodes.item.length;i++){
     items.push(getEdited(nodes.item[i],id,value));
     };

     return {...updatedNodes,item:items};
        
  }
  const addNode=(nodes,id,node)=>{

    if(nodes.id==id){
      const tempNode={...nodes,item:[node,...nodes.item]}
      return tempNode;
    };

   const updatedNodes={...nodes};
   let items=[]
    
   for(let i=0;i<nodes.item.length;i++){
   items.push(addNode(nodes.item[i],id,node));
   };

   return {...updatedNodes,item:items};
      
}
  const onAction=(action,id,value)=>{
 
       
      switch(action){

        case "Edit":{
         const updatedTree= getEdited(commentTree,id,value)
          setCommentTree(updatedTree);
          return
        }

        case "Add":{
         const udpatedNodes= addNode(commentTree,id,{id:Math.random(),value:value,item:[]})
          setCommentTree(udpatedNodes)
          return;
        }
      }
     
  }
   


  const handleSubmit = () => {
     
      onAction("Add",commentTree.id,commentValue)
     
  };

  const findCommentById = (comments, id,action) => {
    // Search for the comment with the given id in the current level of comments
    const comment = comments.find(comment => comment.id === id);
    
    // If the comment is found, return it
    if (comment){
        if(action=="edit"){
         comment.edit=true
        }
        if(action=="delete"){
          //
        }
        if(action=="reply"){
          //
        }
      return comment;
    }
    
    // If the comment is not found at the current level, search recursively in replies
    for (const comment of comments) {
      if (comment.replies) {
        const foundInReplies = findCommentById(comment.replies, id);
        
        if (foundInReplies) {
          return foundInReplies;
        }
      }
    }
    
    // If the comment is not found in this level or its replies, return undefined
    return undefined;
  };
  
  return (
    <div>
      <input type="text" value={commentValue} onChange={(event) => setCommentValue(event.target.value)} />
      <button onClick={handleSubmit}>Comment</button>
     {
      commentTree.item.map((comment)=>{
        return   <CommentActions parentId={comment.id} commentItem={comment} onAction={onAction}/>
      })
     }
    </div>
  );
};

export default Comment;


const CommentActions = ({
   commentItem,
   onAction,
   parentId
}) => {

  const [isEdit,setIsEdit]=useState(false);
  const [isReplay,setIsRepaly]=useState(false);
   const {value,id,item}=commentItem
  const [_value,setValue]=useState(value)
  const [replayVal,setReaplyVal]=useState("");

  const handleAction = (id,action,value) => {
     
    onAction(id,action,value);
  };

   
  const renderCommentBox = (value, id) => {
      
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: 300, border: '2px solid', borderRadius: '5px', padding: '5px' }}>
       {
        isEdit ?(<input value={_value} onChange={(event)=>{
          const val=event.target.value;
            setValue(val)
        }}/>):( <span style={{}}>{value}</span>)
       }
        <div style={{ gap: '5px', display: 'flex' }}>
          {!isEdit ? (
            <>
              <button onClick={() =>setIsRepaly(true)}>Reply</button>
              <button onClick={() =>{
                setIsEdit(true)
                setValue(value)
              }}>Edit</button>
              <button onClick={() => handleAction('Delete', id)}>Delete</button>
            </>
          ) : (
            <>
              <button onClick={()=>{
              handleAction('Edit',id,_value)
              setIsEdit(false)
              }}>Save</button>
              <button onClick={()=>{
                setIsEdit(false)
              }}>Cancel</button>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderReplaybox = (value) => {
     
    return (
      <>
        <input 
          placeholder='Reply' 
          style={{
            border:'1px solid black',
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5, // Adjust border radius as needed
            padding: '5px 10px', // Adjust padding as needed
            margin:10 // Adjust margin as needed
          }} 
          value={replayVal} 
          onChange={(event) => {
            const val = event.target.value;
            setReaplyVal(val);
          }}
        />
        <button onClick={() => {
          handleAction('Add', parentId, replayVal);
          setIsRepaly(false);
        }}>
          Save
        </button>
        <button onClick={() => {
          setIsRepaly(false);
        }}>
          Cancel
        </button>
      </>
    );
  };
  
  
  
 
   
  return (
      <>
      {
       renderCommentBox(value,id) 
      }
      <div style={{marginLeft:'10px'}}> 
        {isReplay && renderReplaybox(value)}
      {
        item?.map((comment)=>{
          return  <CommentActions  parentId={comment.id}  commentItem={comment} onAction={onAction}/>
        })
      }
      </div>
      
      </>


  );
};


