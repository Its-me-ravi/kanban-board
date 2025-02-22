import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const SearchBar = () => {
  const { tasks } = useContext(TaskContext);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = e => {
    const query = e.target.value;
    setSearch(query);
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={handleSearch}
      />
      {search && (
        <div className="search-results">
          {results.map(task => (
            <div key={task.id} className="search-item">
              {task.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
