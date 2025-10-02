import React, { useState } from "react";

function App() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      <input 
        value={name} 
        type="text" 
        onChange={(event) => setName(event.target.value)} 
        placeholder="Name"
      />
      <br />
      <input 
        value={pass} 
        onChange={(event) => setPass(event.target.value)} 
        type="password" 
        placeholder="Password"
      />
      <br />
      <input 
        value={email} 
        onChange={(event) => setEmail(event.target.value)} 
        type="email" 
        placeholder="Email"
      />
      <br />
      <button onClick={() => alert(`Name: ${name}, Password: ${pass}, Email: ${email}`)}>
        Submit
      </button>
      <button onClick={() => { setName(''); setPass(''); setEmail(''); }}>
        Clear
      </button>
      <h1>{name}</h1>
      <h1>{pass}</h1>
      <h1>{email}</h1>
    </div>
  );
}

export default App;
