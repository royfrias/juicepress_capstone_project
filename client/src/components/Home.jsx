import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import './styles/Home.css';
import JPLogo from '../images/JPLogo.png';
import CreateAnnouncement from './CreateAnnouncement';
import SignOut from './SignOut';
import Popup from 'reactjs-popup';
import admin from '../../../server/models/admin';
import user from "../../../server/models/user"
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import DateDisplay from './DateDisplay';
import editIcon from '../images/editIcon.png';
import trashIcon from '../images/trashIcon.png';

// import AllAnnouncements  from './AllAnnouncements';



export default function Home() {
  const [tokenAdmin, setTokenAdmin] = useState(localStorage.getItem("jwt-tokenAdmin"));
  const [tokenUser, setTokenUser] = useState(localStorage.getItem("jwt-token"));
  const [token, setToken] = useState(localStorage.getItem("jwt-tokenAdmin"));
  const [announcements, setAnnouncements] = useState([]);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [announcementImage, setAnnouncementImage] = useState(null);
  const [announcementVideo, setAnnouncementVideo] = useState(null);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});
  const [editingAnnouncement, setEditingAnnouncement] = useState(null)
  const navigate = useNavigate();


    useEffect(() => {
        fetchData();
        if (tokenAdmin) {
            getAdminUsername();
        } else if (tokenUser) {
            getUsername();
        }
    }, [tokenAdmin, tokenUser]);


  function navigateLearning() {
    navigate('/learning');
  }

  function navigateProfile() {
    navigate('/profile');
  }

  function navigateSlack() {
    navigate('/slack');
  }

  //fetching all announcements from database
  async function fetchData() {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/announcements`, {
        headers: {
          authorization: localStorage.getItem('jwt-token')
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAnnouncements(data)
    } catch (error) {
      console.log("error fetching data:", error)
    }
  }useEffect(() => {
    fetchData();
  }, []);

  // creates announcements and appends all of the main properties 
  // announcementTitle, announcementTitle,timestamp, video, image
  async function createAnnouncement() {
    const formData = new FormData;
    formData.append("announcementTitle", announcementTitle);
    formData.append("announcementContent", announcementContent);
    formData.append("timestamp", new Date().toISOString())
    if (announcementImage) formData.append("image", announcementImage);
    if (announcementVideo) formData.append("video", announcementVideo);


    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/createannouncement`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("jwt-token"),
      },
      body:
        formData,
      // announcementTitle,
      // announcementContent
    });

    if (response.status === 200) {
      const body = await response.json();
      fetchData();
      return body.announcement;
    } else {
      const body = await response.json();
      console.log(body.message);
      return null;
    }
  };


   const updateAnnouncement = async () => {
    const formData = new FormData;
    formData.append("announcementTitle", announcementTitle);
    formData.append("announcementContent", announcementContent);
    formData.append("timestamp", new Date().toISOString())
    if (announcementImage) formData.append("image", announcementImage);
    if (announcementVideo) formData.append("video", announcementVideo);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/announcement/${editingAnnouncement._id}`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt-token')}`
        },
        body: formData
      });

      const responseBody = await response.text();

      if(response.ok){
        fetchData();
        setEditingAnnouncement(null)
      }else{
        console.log("Error updating announcement. Status:", response.status);
        console.log("Response body:", responseBody);
        console.log('Error updating announcement');
      }
    } catch (error) {
      console.log('Error updating announcement', error);
    }
  };

  const handleCreateAnnouncement = () => {
    setEditingAnnouncement(null);
    setAnnouncementTitle('');
    setAnnouncementContent('');
    setAnnouncementImage(null);
    setAnnouncementVideo(null);
    document.getElementById('my_modal_2').showModal();
  }

  const handleEditClick = (announcement) => {
    setEditingAnnouncement(announcement);
    setAnnouncementTitle(announcement.announcementTitle);
    setAnnouncementContent(announcement.announcementContent);
    setAnnouncementImage(null);
    setAnnouncementVideo(null);
    document.getElementById('my_modal_2').showModal();
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    if(editingAnnouncement){
      await updateAnnouncement();
    } else {
      await createAnnouncement();
    }
    document.getElementById('my_modal_2').close();
  };

   
  const handleDeleteClick = async (id) =>{
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/announcement/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt-token')}`
        }
      });

      if(response.ok){
        fetchData();
      }else {
        console.log('Error deleting announcement');
      }
    } catch (error) {
      console.log('Error deleting announcement', error);
    }
  }

  async function getUsername() {
    const token = localStorage.getItem("jwt-token");
    console.log("User token:", token);

     if (!token) {
        console.log("No token found in localStorage");
        return;
    }

    //using fetch to obtain user last name and first name from database
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/username`, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem('jwt-token')
      },
    });

    //getting user object
    if (response.status === 200) {
      const body = await response.json();
      setUser(body)

    } else {
      console.log("error");
    }
  }
  //once user is logged in first and last name of user will be displayed on home pg
  useEffect(() => {
    getUsername()
  }, [])

  async function getAdminUsername() {
    const tokenAdmin = localStorage.getItem("jwt-tokenAdmin");
    console.log("Admin Token:", tokenAdmin);

    //using fetch to obtain user last name and first name from database
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/adminUsername`, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("jwt-tokenAdmin")
      },

    });

    //getting user object
    if (response.status === 200) {
      const body = await response.json();
      setAdmin(body)

    } else {
      console.log("error");
    }
  }

  //once user is logged in first and last name of user will be displayed on home pg
  useEffect(() => {
    getAdminUsername()
  }, [])

  return (
    <div>
      <div>
        {tokenAdmin ? (
          <h1 className="flex justify-center font-bold text-2xl mt-3">
            "Welcome {admin.firstName} {admin.lastName}!"
          </h1>
        ) : (
          <h1 className="flex justify-center font-bold text-2xl mt-5">
            "Welcome {user.firstName} {user.lastName}!"
          </h1>
        )}

        <div>
          <p className="flex justify-center text-2xl font-bold py-2">
            <DateDisplay />
          </p>
        </div>

        <div className="flex justify-center text-4xl">
          <h2 className="block font-bold">Important Announcements</h2>
        </div>

        <div className="flex flex-col items-center announcements p-4 border-secondary">
          {announcements.map((announcement, index) => (
            <div key={index} className="block w-1/2 m-4">
              <div className="card lg:card-side bg-base-100 shadow-xl">
                {announcement.image && (
                  <figure className="flex-shrink-0 w-1/3">
                    <img
                      src={`${import.meta.env.VITE_SERVER_URL}/uploads/${announcement.image}`}
                      alt="Announcement"
                      className="object-cover w-full h-48"
                    />
                  </figure>
                )}
                {announcement.video && (
                  <figure className="flex-shrink-0 w-1/3">
                    <video
                      controls
                      src={`${import.meta.env.VITE_SERVER_URL}/uploads/${announcement.video}`}
                      className="object-cover w-full h-48"
                    ></video>
                  </figure>
                )}
                <div className="card-body">
                  <h3 className="font-bold text-xl">{announcement.announcementTitle}</h3>
                  <p>{announcement.announcementContent}</p>
                  {announcement.timestamp && (
                    <p>{formatDistanceToNow(parseISO(announcement.timestamp))} ago</p>
                  )}

                      {tokenAdmin && (
                    <>
                     <button
                      onClick={() => handleEditClick(announcement)}
                      className="flex flex-row justify-end"
                    >
                      <img src={editIcon} alt="pen icon" width="8%" height="8%"></img>
                      {/* Edit button*/}
                    </button>
                    <button
                      onClick={() => handleDeleteClick(announcement._id)}
                      className='flex flex-row justify-end'
                    >
                      <img src={trashIcon} alt="trash icon" width="10%" height="10%"></img>
                      {/* Delete button*/}
                    </button>
                    </>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="content relative">
          <nav
            className="flex flex-col nav1 font-semibold bg-blush py-96 space-y-12"
            style={{ position: 'fixed', left: 0, top: '50%', transform: 'translateY(-50%)' }}
          >
            <div className="flex-row">
              <img
                src={JPLogo}
                style={{ position: 'fixed', left: 30, top: '26%', transform: 'translateY(-50%)' }}
                alt="Juice Press Logo"
                width="75%"
                height="75%"
              ></img>
            </div>

            <div className="flex flex-col space-y-9">
              <button onClick={() => navigateProfile()} className="block btn rounded-full bg-blue-magic hover:bg-clean-green outline outline-offset-1 outline-black w-36 mx-14">
                Profile
              </button>
              <button onClick={() => navigateSlack()} className="block btn rounded-full bg-blue-magic hover:bg-clean-green outline outline-offset-1 outline-black w-36 mx-14">
                Slack
              </button>
              <button onClick={() => navigateLearning()} className="block btn rounded-full bg-blue-magic hover:bg-clean-green outline outline-offset-1 outline-black w-36 mx-14">
                E-Learning
              </button>
              <SignOut></SignOut>
              {token ? (
                <>
                  <button className="block btn bg-blue-magic rounded-full hover:bg-clean-green outline outline-offset-1 outline-black w-42 mx-14" onClick={handleCreateAnnouncement}>
                    Create Post
                  </button>
                  <dialog className="modal-box" id="my_modal_2">
                    <form onSubmit={handleAnnouncementSubmit}>
                      <label className="block">Title:</label>
                      <input
                        className="rounded py-2 px-4 border border-black m-2 w-96"
                        placeholder="Announcement Title"
                        value={announcementTitle}
                        onChange={(e) => setAnnouncementTitle(e.target.value)}
                        required
                      />

                      <label className="block">Content:</label>
                      <textarea
                        className="rounded py-2 px-4 border border-black m-2 w-96 h-80"
                        placeholder="Announcement Content"
                        value={announcementContent}
                        onChange={(e) => setAnnouncementContent(e.target.value)}
                        required
                      />
                      <p>Upload Image:</p>
                      <input
                        className="block rounded py-2 px-4 border border-black m-2"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAnnouncementImage(e.target.files[0])}
                      />
                      <p>Upload Video:</p>
                      <input
                        className="block rounded py-2 px-4 border border-black m-2"
                        type="file"
                        accept="video/*"
                        onChange={(e) => setAnnouncementVideo(e.target.files[0])}
                      />
                      <button className="btn bg-blue-magic rounded-full px-7 py-3 hover:bg-mango-madness font-semibold mt-3 ml-33" type="submit">
                        Submit
                      </button>
                    </form>
                    <button className="btn bg-clean-green rounded-full px-6 py-3 hover:bg-mango-madness font-semibold mt-3 ml-33" onClick={() => document.getElementById('my_modal_2').close()}>
                      Close
                    </button>
                  </dialog>
                </>
              ) : (
                ''
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
