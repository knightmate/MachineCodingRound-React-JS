import React, { useState } from 'react';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';



const Comment = ({ onSubmit }) => {

  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState();
  const [commentItem, setCommentItem] = useState([]);

  const onAction=(action="Edit"|"Add"|"Delete")=>{


     
  }
  const [commentTree,setCommentTree]=useState({
    id:1,
    item:[{id:3,item:[],value:"Good Product"},{id:4,item:[],value:"Not Product"},{id:5,item:[],value:"Great Product"}]
  });


  const handleSubmit = (event) => {
    const val = event.target.value
    const comment = { id: new Date().toLocaleString(), comment: commentValue, replay: false, edit: false,replies:[] };
    setComments((preComments) => [...preComments, comment])
    setCommentItem((pre) => [...pre, comment])
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
        return   <CommentActions  commentItem={comment} onAction={(action, id) => {
         
          switch (action) {
            case "edit": {
              console.log("EDITED VAL",id,action);
            const updatedItem=  findCommentById(commentItem,id)
             
             setCommentItem((pre)=>[...pre]);
              break; 
            }
            case "delete": {
  
            }
            case "reply": {
  
            }
          }
        }} />
      })
     }
    </div>
  );
};

export default Comment;


const CommentActions = ({
   commentItem,
   onAction
}) => {

  const handleAction = (action,id) => {
    //onAction(action,id);
  };

   
  const renderCommentBox = (commentItem) => {
    const {id,value}=commentItem
     return (
      <div style={{ display: 'flex', flexDirection: 'column', width: 300, border: '2px solid', borderRadius: '5px', padding: '5px' }}>
        <span style={{}}>{value}</span>
        <div style={{ gap: '5px', display: 'flex' }}>
          <button onClick={() => handleAction('reply',id)}>Reply</button>
          <button onClick={() => handleAction('edit',id)}>Edit</button>
          <button onClick={() => handleAction('delete',id)}>Delete</button>
            <button onClick={()=>{

            }}>Save</button>
            <button onClick={()=>{

            }}>Cancel</button>
        </div>
      </div>
    )

  }
  
 
   
  return (
      <>
      {
      commentItem.item.map(({item,value,id})=>{
       return renderCommentBox(value,id)
      })
      }
      {/* {
        commentItem?.replay?.length &&  commentItem?.replay?.map((replay)=>{
          return  <CommentActions  commentItem={replay} onAction={onAction}   />
        })
      } */}
      
      </>


  );
};


