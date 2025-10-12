const Pure=()=>{
    const Apple=({eat})=>{
    return(
        <div>
            <h2>this is a human with power of {eat} dimension</h2>
        </div>
    )
}
    return(
        <div>
             <div>
            <Apple eat={1}/>
            <Apple eat={2}/>
            <Apple eat={3}/>
        </div>
        </div>
    )
}
export default Pure;