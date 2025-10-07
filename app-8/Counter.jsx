import { useEffect } from "react";

const Counter= ({count})=>{
    const handelcounter=()=>{
        console.log("caleed it ")
    }
    useEffect(()=>{
        handelcounter();
    },[])
    return (
        <div>
            <h2>Counter Component:{count}</h2>
        </div>
    )
}
export default Counter;