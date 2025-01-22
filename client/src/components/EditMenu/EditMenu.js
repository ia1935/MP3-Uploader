import React, { useState } from "react";
import axios from "axios";

function EditMenu({ song, fetchSongs }) {
    const [formData, setFormData] = useState({
        title: null,
        artist: null,
    });

    const [selectedFile, setSelectedFile] = useState(null);

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "audio/mpeg") {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
        }
    };

    // Handle text input changes
    const handleTextChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const songId = song.id;
            const data = new FormData();
            if (formData.title !== null && formData.title !== "") {
                data.append("song_title", formData.title);
            }
            if (formData.artist !== null && formData.artist !== "") {
                data.append("artist", formData.artist);
            }
            if (selectedFile) { // Check if a file is selected
                data.append("file", selectedFile);
            }

            const response = await axios.put(
                `http://localhost:3000/songs/${songId}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                setFormData({ title: "", artist: "" }); // Reset form data
                setSelectedFile(null); // Reset file selection
            }

            fetchSongs(); // Refresh the song list after successful edit
        } catch (error) {
            console.error("Failure to Update song.", error);
            alert("Failure to edit song");
        }
    };

    return (
        <div className="formbox">
            <form onSubmit={handleSubmit}>
                <div>Edit Song</div>
                <div>
                    <input
                        className="input"
                        placeholder="Title"
                        type="text"
                        id="song_title"
                        name="title"
                        value={formData.title}
                        onChange={handleTextChange}
                    />
                </div>
                <div>
                    <input
                        className="input"
                        placeholder="Artist"
                        type="text"
                        id="artist"
                        name="artist"
                        value={formData.artist}
                        onChange={handleTextChange}
                    />
                </div>
                <div>
                    <label htmlFor="mp3File">MP3 File: </label>
                    <input
                        type="file"
                        id="mp3File"
                        accept=".mp3"
                        name="file"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default EditMenu;
