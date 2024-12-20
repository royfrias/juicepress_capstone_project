import React from "react";
import JPLogo from "../images/JPLogo.png";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminSignUp({ setToken }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function submitSignUp(event) {
    //stops page from reloading

    event.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!firstName || !lastName || !employeeID || !email || !password) {
      setIsLoading(false);
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      //sends empolyeeID, password, and email to backend
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/admin/adminSignup`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            employeeID,
            email,
            password,
          }),
        }
      );

      const body = await response.json();

      if (response.ok) {
        setSuccessMessage("Signup successful! Redirecting...");
        setTimeout(() => navigate("/adminLogin"), 3000);
      } else {
        setErrorMessage(body.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form
        onSubmit={submitSignUp}
        className="h-screen flex flex-col items-center justify-center border rounded-none space-y-5"
      >
        <h1 className="text-4xl font-semibold underline">Admin Sign Up</h1>

        {/* Success and Error Messages */}
        {successMessage && (
          <div className="text-green-600 bg-green-100 p-4 rounded-md text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-red-600 bg-red-100 p-4 rounded-md text-center">
            {errorMessage}
          </div>
        )}

        {/* Input Fields */}
        <input
          className="input input-bordered border-mango-madness w-full max-w-xs"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="input input-bordered border-blue-magic w-full max-w-xs"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="input input-bordered border-mango-madness w-full max-w-xs"
          placeholder="Employee ID"
          type="number"
          value={employeeID}
          onChange={(e) => setEmployeeID(e.target.value)}
        />
        <input
          className="input input-bordered border-blue-magic w-full max-w-xs"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input input-bordered border-mango-madness w-full max-w-xs"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <button
          className={`btn w-full max-w-56 ${
            isLoading ? "bg-gray-400" : "bg-blue-magic hover:bg-mango-madness"
          } text-black`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        <p>Already have an account?</p>
        <Link
          to="/adminLogin"
          className="btn bg-blue-magic text-black hover:bg-mango-madness"
        >
          Log In
        </Link>
        <img src={JPLogo} alt="Juice Press Logo" width="10%" height="10%"></img>
      </form>
    </div>
  );
}
