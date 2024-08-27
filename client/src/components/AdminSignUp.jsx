import React from "react";
import JPLogo from "../images/JPLogo.png";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminSignUp({ setToken }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [employeeID, setEmployeeID] = useState("")
    const navigate = useNavigate()

    async function submitSignUp(event) {
        //stops page from reloading 
        event.preventDefault();
        //sends empolyeeID, password, and email to backend
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/adminSignup`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                employeeID,
                email,
                password
            })
        });

        if (response.status === 200) {
            const body = await response.json();
            //save jwt to local storage
            navigate("/adminLogin")
           
        } else {
            console.log(body.message);
        }

    }
    return (
        <div>
            <form onSubmit={submitSignUp} className='h-screen flex flex-col items-center justify-center border rounded-none space-y-5'>
                <h1 className="text-4xl font-semibold underline">Admin Sign Up</h1>
                <input className="input input-bordered border-mango-madness w-full max-w-xs" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}></input>
                <input className="input input-bordered border-blue-magic w-full max-w-xs" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}></input>
                <input className="input input-bordered border-mango-madness w-full max-w-xs" placeholder="Employee ID" type="number" onChange={(e) => setEmployeeID(e.target.value)}></input>
                <input className="input input-bordered border-blue-magic w-full max-w-xs" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)}></input>
                <input className="input input-bordered border-mango-madness w-full max-w-xs" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                <button className="btn bg-blue-magic text-black hover:bg-mango-madness" type = "submit">Sign Up</button>
                <p>Already have an account?</p>
                <a href="/adminLogin" className="btn bg-blue-magic text-black hover:bg-mango-madness">Log In</a>
                <img src={JPLogo} alt="Juice Press Logo" width="10%" height="10%"></img>
            </form>
        </div>
    )
}