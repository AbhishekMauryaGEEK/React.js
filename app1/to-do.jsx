import React, { useState } from "react";
// CSS styles (can also be moved to a separate CSS file)
const styles = {
  container: {
    maxWidth: 400,
    margin: "20px auto",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  input: {
    padding: 10,
    width: "calc(100% - 22px)",
    marginBottom: 10,
    borderRadius: 4,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  button: {
    padding: "10px 15px",
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#2978f0",
    border: "none",
    borderRadius: 4,
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  buttonDelete: {
    padding: "10px 15px",
    backgroundColor: "#f03e3e",
    border: "none",
    borderRadius: 4,
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  listItem: {
    padding: 8,
    borderBottom: "1px solid #ddd",
  }
};

export function ToDo() {
  const [arr, setArr] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showArray, setShowArray] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setArr([...arr, inputValue]);
      setInputValue("");
    }
  };

  const handleShow = () => {
    setShowArray(true);
  };

  const handleDelete = () => {
    setArr((prevArr) => prevArr.slice(0, -1));
  };

  return (
    <>
      <div style={styles.container}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add number"
          style={styles.input}
        />
        <div>
          <button onClick={handleAdd} style={styles.button}>Add Number</button>
          <button onClick={handleShow} style={styles.button}>Show All Numbers</button>
          <button onClick={handleDelete} style={styles.buttonDelete}>Delete Last Element</button>
        </div>
        {showArray && (
          <ul>
            {arr.map((item, idx) => (
              <li key={idx} style={styles.listItem}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
