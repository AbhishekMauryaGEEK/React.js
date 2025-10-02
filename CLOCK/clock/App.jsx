import React, { useState, useEffect } from "react";
import ColorSelector from "./ColorSelector";

function ColorClock() {
  const [time, setTime] = useState(new Date());
  const [color, setColor] = useState("black");
  const [color2, setColor2] = useState("white");

  useEffect(() => {
    const tick = () => setTime(new Date());
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ColorSelector
        color={color}
        onColorChange={setColor}
        color2={color2}
        onColorChange2={setColor2}
      />
      <h2
        style={{
          color: color,
          backgroundColor: color2,
          height: "50px",
          width: "150px",
          borderRadius: "10px",
          padding: "20px",
          margin: "30px",
          boxShadow: `5px 5px 10px ${color}`,
        }}
      >
        {time.toLocaleTimeString("en-GB", { hour12: false })}
      </h2>
    </div>
  );
}

export default ColorClock;
