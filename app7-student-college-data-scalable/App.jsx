import React from "react";
import colleges from "./College_Data.json";
import College from "./College";

function App() {
  return (
    <div>
      <h1>College List</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          padding: "20px",
        }}
      >
        {colleges.map((college, index) => (
          <College key={index} college={college} />
        ))}
      </div>
    </div>
  );
}

export default App;
