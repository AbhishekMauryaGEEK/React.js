import styled from "styled-components"
import { useRef } from "react";
import Callme from "./callagain";
import Passeve from "./passevent";
function App() {
    const displayeven=(name)=>{
        alert(name)
    }
    return(
        <div>
            <Callme/>
            <Passeve displayeven={displayeven} name="anil"/>
            <Passeve displayeven={displayeven} name="aman"/>
            <Passeve displayeven={displayeven} name="max"/>
            <Passeve displayeven={displayeven} name="collkid"/>
            <Passeve displayeven={displayeven} name="wounder"/>
        </div>
    )
}
export default App;