import React from "react";
// import './styles/SignUp.css';
import JPLogo from "../images/JPLogo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp({ setToken }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  async function submitSignUp(event) {
    event.preventDefault(); //stop page from refreshing on submit

    console.log(import.meta.env.VITE_SERVER_URL);

    //send employeeID and password to backend
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/user/signup`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            password,
            employeeID,
          }),
        }
      );

      const body = await response.json();

      if (response.ok) {
        console.log("Signup successful:", body);
        setSuccessMessage("Signup successful! Welcome!"); // Set the success message
        setTimeout(() => navigate("/"), 5000);
        // Redirect on success
      } else {
        console.error("Signup failed:", body.message || "Unknown error");
        setSuccessMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("There was an error with the signup. Please try again later.");
    }
  }

  return (
    <div>
      {/* displays the sign up form */}

      <form
        onSubmit={submitSignUp}
        className="h-screen flex flex-col items-center justify-center border rounded-none space-y-3"
      >
        <h1 className="text-4xl font-semibold underline">Sign Up</h1>
        <input
          className="input input-bordered border-blue-magic w-full max-w-xs"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <input
          className="input input-bordered border-mango-madness w-full max-w-xs"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <input
          className="input input-bordered border-blue-magic w-full max-w-xs"
          placeholder="Employee ID"
          type="number"
          onChange={(e) => setEmployeeID(e.target.value)}
          value={employeeID}
        />
        <input
          className="input input-bordered border-mango-madness w-full max-w-xs"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          type="submit"
          className="btn bg-blue-magic text-black hover:bg-mango-madness"
        >
          Sign Up
        </button>

        {/* Conditionally render the success or error message */}
        {successMessage && (
          <div className="mt-4 text-center text-xl font-bold bg-green-500 p-4 rounded-md">
            {successMessage}
          </div>
        )}

        <p>Already have an account?</p>
        <a
          href="/"
          className="btn bg-blue-magic text-black hover:bg-mango-madness"
        >
          Log In
        </a>
        <p>Have a Juice Press Email?</p>
        <a
          href="/adminSignup"
          className="btn bg-blue-magic text-black hover:bg-mango-madness"
        >
          Click Here
        </a>
        <img src={JPLogo} alt="Juice Press Logo" width="10%" height="10%"></img>
      </form>
    </div>
  );
}
