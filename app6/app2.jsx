import React from "react";
import userdata from "./userdata.json";

function App() {
  return (
    <div>
      <h1>LOOP IN JSX WITH MAP</h1>
      <table border="2">
        <thead>
          <tr>
            <td>id</td>
            <td>name</td>
            <td>age</td>
            <td>email</td>
          </tr>
        </thead>
        <tbody>
          {userdata.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
