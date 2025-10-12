import { useState, useTransition } from "react";

function Transition() {
    //using normal async await 
    // const [pending,setpending]=useState(false);
    // const handel=async()=>{
    //     setpending(true);
    //    await new Promise(res=>setTimeout(res,2000))
    //    setpending(false);
    //   await new Promise(res=>setTimeout(res,2000))
    //    setpending(true);
    //    await new Promise(res=>setTimeout(res,2000))
    // }
    //using useTransition
    const [pending, start] = useTransition();
    const handel=()=>{
        start(async() => {
            await new Promise(res => setTimeout(res, 2000));
        })
    }
    return (
        <div>
            <h2>usetransition example</h2>
            <button disabled={pending} onClick={handel}>{pending?<img style={{height:"150px",borderRadius:"30px"}} src="https://i.makeagif.com/media/4-15-2024/IoMMB_.gif" alt="" />:"click"}</button>
        </div>
    )
}
export default Transition;