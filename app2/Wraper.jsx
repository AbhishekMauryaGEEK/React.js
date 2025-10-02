import React, { useState } from 'react';
import { color } from 'three/tsl';

function Wraper({ user = "new user",color="blue",color2="aqua" }) {
    const [isHover, setIsHover] = useState(true);

    const animatedStyle = {
        backgroundColor: "#b4e97bff",
        color: "rgba(201, 98, 69, 1)",
        weidth:"40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: isHover ? "20px" : "40px",
        boxShadow: isHover ? "20px 4px 10px 8px black" : "10px 2px 3px 4px black",
        margin: "10px",
        transition: "box-shadow 0.3s, border-radius 0.3s"
    };

    return (
        <div>
            <div
               style={{ ...animatedStyle, fontFamily: "fantasy",}}
                onMouseEnter={() => setIsHover(false)}
                onMouseLeave={() => setIsHover(true)}
            >
                <h1>HULK is Strong</h1>
                <p>name: {user}</p>
            </div>
            <div
                style={animatedStyle }
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <h1 style={{fontFamily:"fantasy",color:color}}>HULK is Strong</h1>
                <p>name: {user}</p>
            </div>
        </div>
    );
}

export default Wraper;
