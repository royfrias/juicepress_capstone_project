import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Home from './components/Home';
import AdminLogIn from './components/AdminLogIn';
import AdminSignUp from './components/AdminSignUp';
import Slack from './components/Slack';

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt-token"));
  // const [setHome, setNewHome] = useState(false);
  return (
  <>
  </>
  )
}
export default App

