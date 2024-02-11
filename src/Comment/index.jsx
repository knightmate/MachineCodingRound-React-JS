import React, { useState } from 'react';

 

const Comment= ({ onSubmit }) => {

  const [comments, setComments] = useState([]);
  const [commentValue,setCommentValue]=useState();
 
  const handleSubmit = (value) => {
    const comment={ comment:value,replay: false, edit: false };
    setComments((preComments)=>[...preComments,comment])

  };

  return (
    <div>
<input type="text" value={commentValue} onChange={(event) => setCommentValue(event.target.value)} />
      <button  onClick={handleSubmit}>Comment</button>
      {
        comments.length>0 && comments.map(({comment})=>{
         return  <CommentActions value={comment} onAction={()=>{

          }}/>
        })
      }
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
  value=""
}) => {
  const handleAction = (action) => {
    onAction(action);
  };

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => handleAction('reply')}>Reply</button>
      <button onClick={() => handleAction('edit')}>Edit</button>
      <button onClick={() => handleAction('delete')}>Delete</button>
      {showSaveButton && <button onClick={onSave}>Save</button>}
      {showCancelButton && <button onClick={onCancel}>Cancel</button>}
    </div>
  );
};

 
