import React from 'react';
// import './styles/SignUp.css';
import JPLogo from '../images/JPLogo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function SignUp({ setToken }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [employeeID, setEmployeeID] = useState("")
    const navigate = useNavigate()

    async function submitSignUp(event) {
        event.preventDefault(); //stop page from refreshing on submit
        //send employeeID and password to backend
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/signup`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                password,
                employeeID

            })
        });


        if (response.status === 200) {
            const body = await response.json();
            //save jwt to local storage
            navigate("/")
            

        } else {
            console.log(body.message);
        }
    }

    return (
        <div>

            {/* displays the sign up form */}

            <form onSubmit={submitSignUp} className='h-screen flex flex-col items-center justify-center border rounded-none space-y-3'>
                <h1 className="text-4xl font-semibold underline">Sign Up</h1>
                <input className="input input-bordered border-blue-magic w-full max-w-xs" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}></input>
                <input className="input input-bordered border-mango-madness w-full max-w-xs" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}></input>
                <input className="input input-bordered border-blue-magic w-full max-w-xs" placeholder="Employee ID" type="number" onChange={(e) => setEmployeeID(e.target.value)}></input>
                <input className="input input-bordered border-mango-madness w-full max-w-xs" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit" className="btn bg-blue-magic text-black hover:bg-mango-madness">Sign Up</button>
                <p>Already have an account?</p>
                <a href="/" className="btn bg-blue-magic text-black hover:bg-mango-madness">Log In</a>
                <p>Have a Juice Press Email?</p>
                <a href="/adminSignup" className="btn bg-blue-magic text-black hover:bg-mango-madness">Click Here</a>
                <img src={JPLogo} alt="Juice Press Logo" width="10%" height="10%"></img>
            </form>

    

        </div>
    )
}