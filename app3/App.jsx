import React, { useState } from 'react';

function App() {
  const [use, setUse] = useState("abhi");
  const [input, setInput] = useState("");
  const [present, setPresent] = useState(true);
  const [val, setNew] = useState("");
  const [val1, setNew1] = useState("");
  const togglePresent = () => {
    setPresent(!present);
  };
  const updateName = () => {
    setUse(input);
  };
  const updateSecondName = () => {
    setNew1(val);
  };

  return (
    <div>
      <h3>Input your name:</h3>
      <input
        type="text"
        placeholder="Enter your Name"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      {present && <h1>{use}</h1>}
      <button onClick={updateName}>Update Name</button>
      <button onClick={togglePresent}>
        {present ? "Hide Name" : "Show Name"}
      </button>

      <h3>Input next name:</h3>
      <input
        type="text"
        value={val}
        placeholder="Enter new name"
        onChange={(event) => setNew(event.target.value)}
      />
      <button onClick={updateSecondName}>Update Next Name</button>
      <h1>{val1}</h1>
      <button onClick={() => setNew("")}>Clear the input value</button>
      <button onClick={() => setNew1("")}>Clear the displayed value</button>
    </div>
  );
}
export default App;
