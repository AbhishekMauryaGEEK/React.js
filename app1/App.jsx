import { useState } from 'react';
import { Counter, Showhide } from './count';
import { ToDo } from './to-do'; // Use the correct export name

function Call() {
  const [headingColor, setHeadingColor] = useState('#461818ff');
  const [fruit, setFruit] = useState('APPLE');

  // Generates a random hex color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Handles heading color change
  const handleHeadingColorChange = () => {
    setHeadingColor(getRandomColor());
  };

  // Handles fruit name change
  const handleFruitChange = () => {
    setFruit('CHERRY');
  };

  return (
    <div>
      <h2 style={{ color: headingColor }}>Call to Action</h2>
      <button
        type="button"
        onClick={handleHeadingColorChange}
        style={{
          height: 50,
          backgroundColor: 'lightblue',
          borderRadius: 30,
          border: 'none',
          boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        Change Heading Color
      </button>
      <h1>{fruit}</h1>
      <button onClick={handleFruitChange}>Change Fruit Name</button>
      <Counter />
      <Showhide />
      <ToDo />
    </div>
  );
}

export default Call;
