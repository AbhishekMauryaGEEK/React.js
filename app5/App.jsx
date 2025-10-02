import React, { useState } from "react";

function App() {
  const [gender, setgender] = useState('Female');
  const [city,setcity]=useState('');
  return (
    <div>
      <h1>Handle this radio & Dropdown</h1>
      <h3>
        <input type="radio" value="Male" checked={gender === 'Male'} onChange={(event) => setgender(event.target.value)} name="gender" id="male" />
        <label htmlFor="male">Male</label>
        <input type="radio" value="Female" checked={gender === 'Female'} onChange={(event) => setgender(event.target.value)} name="gender" id="female" />
        <label htmlFor="female">Female</label>
        <h2>Selected Gender: {gender}</h2>
        <h2>Selected City:</h2>
        <select defaultValue={"noida"} onClick={(event)=>setcity(event.target.value)}>
          <option value='noida' >Noida</option>
          <option value="delhi">delhi</option>
          <option value="gaziyabad">gaziyabad</option>
          <option value="gurgao">gurgao</option>
        </select>
        <h2>Selected city:{city}</h2>
      </h3>
    </div>
  );
}

export default App;
