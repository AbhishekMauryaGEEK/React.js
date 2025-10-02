import React from "react";
const User=({user})=>{
    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"flex-end",flexDirection:"row-reverse"}}>
<div style={{height:"200px",width:"200px",margin:"30px",padding:"10px",background:"lightpink",borderRadius:"30px"}}>
        <h3><span style ={{color:"white"}}>Name:{user.name}</span></h3> <h3><span style ={{color:"white"}}>age:{user.age}</span></h3> <h3><span style ={{color:"white"}}>id:{user.id}</span></h3>
        </div>
</div>
    )
}
export default User;