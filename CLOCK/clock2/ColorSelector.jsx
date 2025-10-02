import React from "react";

function ColorSelector({ color, onColorChange, color2, onColorChange2 }) {
  return (
    <div>
      <div style={{display:"flex",flexDirection:"row",gap:"120px"}}>
      <h3 >
        Font and shadow
      </h3>
      <h3 >Background </h3>
      </div>
      <select style={{
        height: "100px",
        width: "180px",
        borderRadius: "30px",
        border: "none",
        backgroundColor: "pink",
        margin: "10px",
        textAlign: "center"
      }} value={color} onChange={(e) => onColorChange(e.target.value)}>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="white">White</option>
      </select>
      <select style={{
        height: "100px",
        width: "180px",
        borderRadius: "30px",
        border: "none",
        backgroundColor: "pink",
        margin: "10px",
        textAlign: "center"
      }} value={color2} onChange={(e) => onColorChange2(e.target.value)}>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="white">White</option>
      </select>
    </div>
  );
}

export default ColorSelector;
