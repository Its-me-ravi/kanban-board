import React from "react";
import TaskForm from "./components/TaskForm";
import Column from "./components/Column";
import SearchBar from "./components/SearchBar";
import DarkModeToggle from "./components/DarkModeToggle";
import { TaskProvider } from "./context/TaskContext";


const App = () => {
  return (
    <TaskProvider>
      <div className="app">
        <header>
          <h1>Kanban Board</h1>
          <DarkModeToggle />
        </header>
        <SearchBar />
        <TaskForm />
        <div className="kanban-board">
          <Column title="To Do" status="todo" />
          <Column title="In Progress" status="inprogress" />
          <Column title="Done" status="done" />
        </div>
      </div>
    </TaskProvider>
  );
};

export default App;
