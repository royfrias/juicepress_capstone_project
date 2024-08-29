import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAnnouncement({ setToken }) {
    const [title, setAnnouncementTitle] = useState();
    const [content, setAnnouncementContent] = useState();

    async function submitCreateAnnouncement(event) {
        event.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/createannouncement`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: localStorage.getItem("jwt-token")
            },
            body: JSON.stringify({
                title,
                content
            })
        });

        const responseContent = await response.json();

        if (response.status === 200) {
            const body = await response.json();
            console.log(`Your announcement was saved!`)
        } else {
            console.log(responseContent.message)
        }
    }

    return (
        <div>

            <form onSubmit={submitCreateAnnouncement} className="h-screen flex flex-col items-center justify-center">
                <div>
                    <h1 className="font-bold text-4xl m-8 ">Create Announcement</h1>
                </div>

                <div className="">
                    <h2>Announcement Title:</h2>
                    <input className="block border-black input w-full max-w-xs" placeholder="Title" type="text" onChange={(e) => setAnnouncementTitle(e.target.value)}></input>
                    <h2 className="block">Content:</h2>
                    <textarea className="block textarea" onChange={(e) => setAnnouncementContent(e.target.value)}></textarea>
                </div>

                <div>
                    <a href='home' className='btn-lg font-semibold bg-primary rounded-full hover:bg-secondary content-center' type="submit">Submit</a>
                </div>
            </form>
        </div>
    );
}