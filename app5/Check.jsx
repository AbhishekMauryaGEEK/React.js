import React from "react";
import { useState } from "react";
import { div } from "three/tsl";
function Check (){
    const [skills, skillsset] = useState([]);

    const handels = (event) => {
        const value = event.target.value;
        const checked = event.target.checked;
        if (checked) {
            skillsset([...skills, value]);
        } else {
            skillsset(skills.filter(skill => skill !== value));
        }
    };

    return (
        <div>
            <h1>Handel Check BOX</h1>
            <label htmlFor="Js">Js</label>
            <input
                type="checkbox"
                value="Js"
                id="Js"
                onChange={handels}
                checked={skills.includes("Js")}
            />
            <br />
            <label htmlFor="React">React</label>
            <input
                type="checkbox"
                value="React"
                id="React"
                onChange={handels}
                checked={skills.includes("React")}
            />
            <br />
            <label htmlFor="Php">Php</label>
            <input
                type="checkbox"
                value="Php"
                id="Php"
                onChange={handels}
                checked={skills.includes("Php")}
            />
            <h1>{skills.toString()}</h1>
            <button onClick={() => skillsset([])}>Clear</button>
        </div>
    );
}

export default Check;