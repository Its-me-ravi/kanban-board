import React, { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode((prev) => !prev)}
      />
      <span className="slider"></span>
    </label>
  );
};

export default DarkModeToggle;
