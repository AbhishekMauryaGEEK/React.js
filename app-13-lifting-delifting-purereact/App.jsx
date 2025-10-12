import Pure from "./purereact";
import { useState } from "react";
import Lifting from "./lifting";
import Dilift from "./delifting";
function App() {
  const[user,setuser]=useState('');
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState('');
  const total =users.length
  const lastuser =users[users.length-1];
  const unique=[...new Set(users)].length
  const addUser = () => {
    if(update.trim() !== '') {
      setUsers([...users, update]);
      setUpdate('');
    }
  };

  return (
    <div>
        <h2>Total Users:{total}</h2>
        <h2>Last User:{lastuser}</h2>
        <h2>Unique Total User:{unique}</h2>
      <input
        type="text"
        value={update}
        onChange={(event) => setUpdate(event.target.value)}
        placeholder="new user"
      />
      <button onClick={addUser}>Add user</button>
      {
        users.map((item, index) => (
          <h3 key={index}>{item}</h3>
        ))
      }
      <Pure />
      <Lifting setuser={setuser}/>
      <Dilift user={user}/>
    </div>
  );
}

export default App;
