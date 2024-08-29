import { useEffect, useState } from 'react';


export default function showAnnouncements() {
    
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await (await fetch(`${import.meta.env.VITE_SERVER_URL}/`)).json()
        setAnnouncements(response);
        console.log(response)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
    fetchData();
  }, []);

  return (
    <div className="h-screen">
      {announcements.map((response) => (
        <div key={response._id}> 
        Title: {response.announcementTitle}
         Content: {response.announcementContent}
        </div>
      ))}
    </div>
  );
}