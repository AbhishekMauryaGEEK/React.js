import { useEffect } from "react";

const Counter = ({ count, counter, date }) => {
    const handelcounter = () => {
        console.log("caleed it ")
    }
    useEffect(() => {
        handelcounter();
    }, [count])
    useEffect(() => {
        callonce();
    }, [counter])
    useEffect(() => {
        mingo();
    }, [date])
    useEffect(()=>{
        return ()=>{
            console.log("hide it ")
        }
    },[])
    function callonce() {
        console.log("callonce function called ")
    }
    function mingo() {
        console.log("mingo function called ")
    }
    return (
        <div>
            <h2>Useeffect Hook</h2>
            <h2>Counter Component:{count}</h2>
            <h2>Counter Component:{counter}</h2>
            <h2>Counter Component:{date}</h2>
        </div>
    )
}
export default Counter;