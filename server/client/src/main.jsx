import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LogIn from './components/LogIn.jsx';
import SignUp from './components/SignUp.jsx';
import Home from './components/Home.jsx';
import AdminLogIn from './components/AdminLogIn.jsx';
import AdminSignUp from './components/AdminSignUp.jsx';
import CreateAnnouncement from './components/CreateAnnouncement.jsx';
import Profile from './components/Profile.jsx';
import AllAnnouncements from './components/AllAnnouncements.jsx';
import Slack from './components/Slack.jsx';
import Learning from './components/Learning.jsx'
// import EditAnnouncement from './components/EditAnnouncement.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn> </LogIn>,
  },
  {
    path: "/signup",
    element: <SignUp> </SignUp>,
  },
  {
    path: "/home",
    element: <Home> </Home>,
  },
  {
    path: "/adminLogin",
    element: <AdminLogIn></AdminLogIn>
  },
  {
    path: "/adminSignup",
    element: <AdminSignUp></AdminSignUp>
  },
  {
    path: "/createannouncement",
    element: <CreateAnnouncement></CreateAnnouncement>
  },
  {
    path: "/profile",
    element: <Profile> </Profile>
  },
  {
    path: "/announcements",
    element: <AllAnnouncements> </AllAnnouncements>
  },
  {
    path: "/slack",
    element: <Slack></Slack> 
  },
  {
    path: "/learning",
    element: <Learning></Learning> 
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
