//method used before react 19  in reactr 18 and past versions.
// import { forwardRef } from "react"

// const Forwardref=(props,useref)=>{
//     return(
//         <div>
//            <input type="text" placeholder="this is text"  ref={useref}/>
//         </div>
//     )
// }
// export default  forwardRef(Forwardref);

//method used in react 19 and upcoming version
import { forwardRef } from "react"

const Forwardref=(props,)=>{
    return(
        <div>
           <input type="text" placeholder="this is text"  ref={props.ref}/>
        </div>
    )
}
export default Forwardref;