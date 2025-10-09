import { useEffect, useState } from "react";
import Counter from "./counter";
function App() {
  const [counter, setcounter] = useState(0);
  const [date, setdate] = useState(0);
  const [count, setcount] = useState(0);
  const [display, setdisplay] = useState(false);
  
  return (
    <div>
      <h2>Useeffect Hook</h2>
      <button onClick={() => setcounter(counter + 1)}>Counter</button>
      <h1>value:{counter}</h1>
      <button onClick={() => setdate(date + 1)}>date</button>
      <h1>value:{date}</h1>
      <button onClick={() =>setcount(count+1)}>call</button>
      <h1>value:{count}</h1>
      <button onClick={()=>setdisplay(!display)}>show & hide</button>
      <button onClick={()=>{
        setcounter(0) 
        setcount(0)
        setdate(0)
        }}>Reset</button>
      { display ? <Counter count={count} date={date} counter={counter} /> : null }
    </div>
  )
}
export default App;