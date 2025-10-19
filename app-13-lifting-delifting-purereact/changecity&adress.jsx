import { useState } from "react";

function Changecity() {
    const [data, setdata] = useState({
        name: "abhishek",
        address: {
            city: {
                region: { house: "306" },
                area: "akul"
            },
            country: "india"
        }
    })
    const handelname = (val) => {
        data.name = val
        console.log(val)
        setdata({ ...data })
    }
    const handelcity = (city) => {
        data.address.city = city;
        console.log(city);
        setdata({
            ...data,
            address: {
                ...data.address,
                city: {
                    ...data.address.city,
                    region: city.region
                }
            }
        });


    }
    return (
        <div>
            <h2>Updating objects </h2>
            <input type="text" placeholder="Plese enter your name" onChange={(event) => handelname(event.target.value)} />
            <input type="text" placeholder="Plese enter your city" onChange={(event) => handelcity(event.target.value)} />
            <h2>name:{data.name}</h2>
            <h2>city:{data.address.city}</h2>
            <h2>country:{data.address.country}</h2>
        </div>
    )
}
export default Changecity;