import { useState } from "react";
import { div } from "three/tsl";

 export function Counter() {
    // No import for array needed, just use native JS array
    const array = [1,2,3,4,5,6,7,8,9,10,11];
    const [alpha, setAlpha] = useState('Random from 1-11');

    const newClick = () => {
        const k = array[Math.floor(Math.random() * array.length)];
        setAlpha(`${k}`); 
    };

    return (
        <div>
            <h1>{alpha}</h1>
            <button onClick={newClick}>change it</button>
        </div>
    );
}

export function Showhide() {
const[display,setdisplay]= useState(true)
return(
    <div>
        <button onClick={()=>setdisplay(!display)}>
            Chnage
        </button>
        <h1>
            can you see it
        </h1>{
        display ? <h1>wow</h1>:<h1>no user name</h1>
        }
        </div>
)
}

