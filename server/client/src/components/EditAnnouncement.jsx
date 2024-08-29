// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// export default function EditAnnouncement() {
//   const { id } = useParams();
//   const [announcement, setAnnouncement] = useState(null);
//   const [announcementTitle, setAnnouncementTitle] = useState('');
//   const [announcementContent, setAnnouncementContent] = useState('');
//   const [announcementImage, setAnnouncementImage] = useState(null);
//   const [announcementVideo, setAnnouncementVideo] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchAnnouncement() {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/announcement/${id}`, {
//           headers: {
//             authorization: `Bearer ${localStorage.getItem('jwt-token')}`
//           }
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setAnnouncement(data);
//           setAnnouncementTitle(data.announcementTitle);
//           setAnnouncementContent(data.announcementContent);
//         } else {
//           console.log('Error fetching announcement');
//         }
//       } catch (error) {
//         console.log('Error fetching data', error);
//       }
//     }
//     fetchAnnouncement();
//   }, [id]);

//   const handleUpdateAnnouncement = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("announcementTitle", announcementTitle);
//     formData.append("announcementContent", announcementContent);
//     formData.append("timestamp", new Date().toISOString());
//     if (announcementImage) formData.append("image", announcementImage);
//     if (announcementVideo) formData.append("video", announcementVideo);

//     try {
//       const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/announcement/${id}`, {
//         method: 'PUT',
//         headers: {
//           authorization: `Bearer ${localStorage.getItem('jwt-token')}`
//         },
//         body: formData
//       });

//       if (response.ok) {
//         const data = await response.json();
//         navigate('/home');
//       } else {
//         console.log('Error updating announcement');
//       }
//     } catch (error) {
//       console.log('Error updating announcement', error);
//     }
//   };

//   const handleDeleteAnnouncement = async () => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/announcement/${id}`, {
//         method: 'DELETE',
//         headers: {
//           authorization: `Bearer ${localStorage.getItem('jwt-token')}`
//         }
//       });

//       if (response.ok) {
//         navigate('/home');
//       } else {
//         console.log('Error deleting announcement');
//       }
//     } catch (error) {
//       console.log('Error deleting announcement', error);
//     }
//   };

//   if (!announcement) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Edit Announcement</h1>
//       <form onSubmit={handleUpdateAnnouncement}>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Title
//           </label>
//           <input
//             type="text"
//             value={announcementTitle}
//             onChange={(e) => setAnnouncementTitle(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Content
//           </label>
//           <textarea
//             value={announcementContent}
//             onChange={(e) => setAnnouncementContent(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Image
//           </label>
//           <input
//             type="file"
//             onChange={(e) => setAnnouncementImage(e.target.files[0])}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Video
//           </label>
//           <input
//             type="file"
//             onChange={(e) => setAnnouncementVideo(e.target.files[0])}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Update Announcement
//         </button>
//         <button
//           type="button"
//           onClick={handleDeleteAnnouncement}
//           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
//         >
//           Delete Announcement
//         </button>
//       </form>
//     </div>
//   );
// }
