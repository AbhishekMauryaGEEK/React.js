

function Lifting({setuser}){
   
    return (
        <div>
            <h2>Add user</h2>
            <input type="text" onChange={(event)=>setuser(event.target.value)} placeholder="enter your name" />
            <br /><hr />
        </div>
    )
}
export default Lifting;