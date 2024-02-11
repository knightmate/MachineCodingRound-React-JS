import React, { useState } from 'react';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';



const Comment = ({ onSubmit }) => {

  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState();
  const [commentItem, setCommentItem] = useState([]);

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
      <CommentActions comments={comments} commentItem={commentItem} onAction={(action, id) => {
         
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
    </div>
  );
};

export default Comment;


const CommentActions = ({
  onAction,
  showSaveButton = false,
  showCancelButton = false,
  onSave,
  onCancel,
  comments,
  commentItem,
  onChange
}) => {

  const handleAction = (action,id) => {
    onAction(action,id);
  };


  const renderCommentBox = (value,id) => {
  console.log("id",id);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: 300, border: '2px solid', borderRadius: '5px', padding: '5px' }}>
        <span style={{}}>{value}</span>
        <div style={{ gap: '5px', display: 'flex' }}>
          <button onClick={() => handleAction('reply',id)}>Reply</button>
          <button onClick={() => handleAction('edit',id)}>Edit</button>
          <button onClick={() => handleAction('delete',id)}>Delete</button>
          {showSaveButton && <button onClick={onSave}>Save</button>}
          {showCancelButton && <button onClick={onCancel}>Cancel</button>}
        </div>
      </div>
    )

  }
  
  if(!commentItem.length || !comments.length)return<></>

 
  return (
      <>
      {
      commentItem.map((comment)=>{
       return renderCommentBox(comment.comment,comment.id)
      })
     
      }
      {
        commentItem?.replay?.length &&  commentItem?.replay?.map((replay)=>{
          return  <CommentActions comments={comments} commentItem={replay} onChange={onChange} handleAction={handleAction} onAction={onAction} />
        })
      }
      
      </>


  );
};


