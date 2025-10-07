import { useEffect, useState } from "react";
import Counter from "./counter";
function App() {
  const [counter, setcounter] = useState(0);
  const [date, setdate] = useState(0);
  const [count, setcount] = useState(0);
  useEffect(() => {
    callonce();
  }, [counter])
  useEffect(() => {
    mingo();
  }, [date])
  function callonce() {
    console.log("callonce function called ")
  }
  function mingo() {
    console.log("mingo function called ")
  }
  return (
    <div>
      <h2>Useeffect Hook</h2>
      <button onClick={() => setcounter(counter + 1)}>Counter</button>
      <h1>value:{counter}</h1>
      <button onClick={() => setdate(date + 1)}>date</button>
      <h1>value:{date}</h1>
      <Counter count={count}/>
      <button onClick={() =>setcount(count+1)}>call</button>
    </div>
  )
}
export default App;