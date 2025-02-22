import React, { createContext, useReducer, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Initial tasks (if no tasks are in localStorage)
const initialTasks = [
  { id: 1, title: "Task 1", description: "This is task 1", status: "todo", comments: [] },
  { id: 2, title: "Task 2", description: "This is task 2", status: "inprogress", comments: [] },
];

export const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "EDIT_TASK":
      return state.map(task => task.id === action.payload.id ? action.payload : task);

    case "DELETE_TASK":
      return state.filter(task => task.id !== action.payload);

    case "MOVE_TASK":
      return state.map(task =>
        task.id === action.payload.id ? { ...task, status: action.payload.status } : task
      );

    case "ADD_COMMENT":
      return state.map(task =>
        task.id === action.payload.taskId
          ? { ...task, comments: [...task.comments, action.payload.comment] }
          : task
      );

    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  // Custom hook for localStorage
  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", initialTasks);
  const [tasks, dispatch] = useReducer(taskReducer, storedTasks);

  // For undo feature, we can store last deleted task
  const [lastDeleted, setLastDeleted] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  // Enhance dispatch for DELETE_TASK to support undo
  const enhancedDispatch = action => {
    if (action.type === "DELETE_TASK") {
      const taskToDelete = tasks.find(task => task.id === action.payload);
      setLastDeleted(taskToDelete);
    }
    dispatch(action);
  };

  // Undo deletion
  const undoDelete = () => {
    if (lastDeleted) {
      dispatch({ type: "ADD_TASK", payload: lastDeleted });
      setLastDeleted(null);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, dispatch: enhancedDispatch, undoDelete, lastDeleted }}>
      {children}
    </TaskContext.Provider>
  );
};
