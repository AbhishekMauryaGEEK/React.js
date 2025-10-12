import { useRef } from "react";
import Forwardref from "./forwardref";
import Submitdelay from "./submitdelay";
import Transition from "./Transition";
function App(){
    const useref=useRef(null)
        const updateInput=()=>{

            useref.current.focus();
            useref.current.value="wow"
        }
    return (
        <div>
            <Forwardref ref={useref}/>
            <button onClick={updateInput}>sd</button>
            <Submitdelay/>
            <Transition/>
        </div>
    )
}
export default App;