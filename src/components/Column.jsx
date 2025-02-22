import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const Column = ({ title, status }) => {
  const { tasks, dispatch, undoDelete, lastDeleted } = useContext(TaskContext);

  const onDrop = e => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    dispatch({ type: "MOVE_TASK", payload: { id: Number(taskId), status } });
  };

  return (
    <div className="column" onDragOver={e => e.preventDefault()} onDrop={onDrop}>
      <h3>{title}</h3>
      {tasks.filter(task => task.status === status).map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
      {lastDeleted && (
        <button className="undo-btn" onClick={undoDelete}>
          Undo Delete
        </button>
      )}
    </div>
  );
};

export default Column;
