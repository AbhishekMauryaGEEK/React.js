import styled from "styled-components"
import { useRef } from "react";
function Callme(){
        const  refuse=useRef(null);
    const h1ref=useRef(null);
    const callh1=()=>{
        console.log(h1ref)
        h1ref.current.style.color="blue"
    }
    const callme=()=>{
        console.log(refuse);
        refuse.current.focus()
        refuse.current.style.backgroundColor="rgb(225, 225, 181)"
        refuse.current.style.borderRadius="20px"
        refuse.current.placeholder="NAME LIKH DE LADLE"
        refuse.current.value="shdioad"
    }
    const callagain=()=>{
        if( refuse.current.style.display!="none"){
            refuse.current.style.display="none"
        }
        else{
            refuse.current.style.display="inline"
        }
    }
    const Heading = styled.h1`
    color:red;
    background:linear-gradient(23deg,rgba(41, 41, 172, 1),rgba(230, 230, 245, 1));
    border-radius:10px;
    `
    return (
        <div>
                 <button onClick={callagain}> <Heading> 
                switch
                </Heading>
               </button>
            <input ref={refuse} type="text" placeholder="Enter your good name " />  
            <button onClick={callme}> <Heading> 
                 Focus on name field
                </Heading>
               </button>
               <button onClick={callh1}> change it</button>
            <Heading ref={h1ref}> Hello</Heading>
        </div>
    )
}
export default Callme;