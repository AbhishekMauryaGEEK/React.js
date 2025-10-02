import React from "react";
import { useState } from "react";
import { userData } from "three/tsl";
import User from "./User";
function App(){
  const userinfo=['abhi','raghav','pete','aman'];
  const userdata=[
  {
    name:'jin woo',
    age:'25',
    email:'jinwoo@gmail.com',
    id:1
  },
  {
    name: 'Alice Johnson',
    age: '30',
    email: 'alice.johnson@example.com',
    id: 1
  },
  {
    name: 'Bob Smith',
    age: '28',
    email: 'bob.smith@example.com',
    id: 2
  },
  {
    name: 'Charlie Brown',
    age: '22',
    email: 'charlie.brown@example.com',
    id: 3
  },
  {
    name: 'Diana Prince',
    age: '27',
    email: 'diana.prince@example.com',
    id: 4
  }
  ]
  return(
    <div>
      <h1>LOOP IN JSX WITH MAP</h1>
      <table border='2'>
        <thead>
          <tr>
            <td>id</td>
            <td>name</td>
            <td>email</td>
            <td>age</td>
          </tr>
        </thead>
        <tbody>
          {
            userdata.map((user)=>(
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.email}</td>
          </tr>
            ))
          }
        </tbody>
      </table>
      <h2>Reusing json</h2>
     {
      userdata.map((user) => (
    <div key={user.id}>
      <User user={user} />
    </div>
  ))
}  
    </div>
  )
}
export default App; 