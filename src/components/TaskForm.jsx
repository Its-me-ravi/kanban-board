import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskForm = () => {
  const { dispatch } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now(),
        title,
        description,
        status: "todo",
        comments: []
      }
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
