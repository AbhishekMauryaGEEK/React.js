import { useRef } from "react";

function Form() {
    const refuser=useRef(null);
    const refpass=useRef(null);
    const handleform = (event) => {
        event.preventDefault();
        const user = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        const passwor = document.querySelector(".abhi").value;
        console.log(`username :${user}`)
        console.log(`password:${password}`)
        console.log(`passwo:${passwor}`)
    }
    const handelform1=(event)=>{
        event.preventDefault();
        const user =refuser.current.value
        const user2 =refpass.current.value
        console.log("handelform1",user)
        console.log("handelform1",user2)
    }
    return (
        <div>
            <h2>---Uncontrolled Components---</h2>
            <form action="" method="post" onSubmit={handleform}>
                <input type="text" id="username" placeholder="Enter your name" />
                <br /><br />
                <input type="password" id="password" className="abhi" placeholder="Enter your Password" />
                <br /><br />qwe
                <button>Submit</button>
            </form>
            <hr /><br /><br />
            <h2>---UnControlled Components with useref---</h2>
            <form action="" method="post" onSubmit={handelform1}>
                <input type="text" ref={refuser} id="usernameRef" placeholder="Enter your name" />
                <br /><br />
                <input type="password" ref={refpass} id="passwordRef" className="abhi" placeholder="Enter your Password" />
                <br /><br />
                <button>Submit with ref</button>
            </form>
        </div>
    )
}
export default Form;