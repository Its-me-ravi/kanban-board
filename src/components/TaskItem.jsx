import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskItem = ({ task }) => {
  const { dispatch } = useContext(TaskContext);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [comment, setComment] = useState("");

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    dispatch({
      type: "EDIT_TASK",
      payload: { ...task, title: editTitle, description: editDescription }
    });
    setEditing(false);
  };

  const handleAddComment = e => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch({
        type: "ADD_COMMENT",
        payload: { taskId: task.id, comment }
      });
      setComment("");
    }
  };

  return (
    <div
      className="task-item"
      draggable
      onDragStart={e => e.dataTransfer.setData("taskId", task.id)}
    >
      {editing ? (
        <>
          <input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
          <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <div className="task-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}>
              Delete
            </button>
          </div>
          <div className="comments">
            <h5>Comments</h5>
            {task.comments.map((c, index) => (
              <p key={index}>- {c}</p>
            ))}
            <form onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder="Add comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <button type="submit">Add</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
