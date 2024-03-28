import React, { useState } from "react";

function Comment_box() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [activeCommentIndex, setActiveCommentIndex] = useState(false);

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleCommentClick = () => {
    setActiveCommentIndex(!activeCommentIndex);
  };

  return (
    <div>
      <h3 onClick={handleCommentClick}>comment</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      {activeCommentIndex === true ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={handleChange}
            placeholder="Add a comment..."
            rows="4"
            cols="25"
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>NO comments</p>
      )}
    </div>
  );
}

export default Comment_box;
