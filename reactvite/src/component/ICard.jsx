import React from 'react'

function ICard({data}) {
  return (
    <div style={{border:'10px solid red', width:'300px', height:'350px'}}>
    <img src={data.pic} height={150} width={150}></img>
    <h2>Name:{data.name}</h2>
   <h2>Roll:{data.roll}</h2>
   <h2>Branch:{data.branch}</h2>
   <h2>College:{data.college}</h2>

    </div>
  )
}

export default ICard