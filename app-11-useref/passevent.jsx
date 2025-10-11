import React, { useState } from "react";

function Passeve({displayeven,name}) {
  return (
    <div>
      <button onClick={()=>displayeven(name)}>display</button>
    </div>
  );
}

export default Passeve;
