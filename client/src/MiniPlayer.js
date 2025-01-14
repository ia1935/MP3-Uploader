import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function MiniPlayer({ song }) {
    const audioRef = useRef(null);
    const [audioURL, setAudioURL] = useState(null);

    useEffect(() => {
        if (song) {
            fetchAndPlaySong(song.id);
        }

        // Cleanup audio URL when song changes or component unmounts
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            if (audioURL) {
                URL.revokeObjectURL(audioURL);
                setAudioURL(null);
            }
        };
    }, [song]);

    const fetchAndPlaySong = async (songId) => {
        try {
            const response = await axios.get(`http://localhost:3000/songs/file/${songId}`, {
                responseType: 'blob',
            });

            const blob = response.data;
            const url = URL.createObjectURL(blob);
            setAudioURL(url);

            if (audioRef.current) {
                audioRef.current.pause();
            }

            const audio = new Audio(url);
            audioRef.current = audio;
            audio.play();

            // Clean up URL when audio finishes playing
            audio.onended = () => {
                URL.revokeObjectURL(url);
                setAudioURL(null);
            };
        } catch (error) {
            console.error('Error playing song', error);
        }
    };

    if (!song) {
        return <div>Select a song to play</div>;
    }

    return (
        <div className="mini-player">
            <div>
                <h3>{song.song_title}</h3>
                <p>{song.artist}</p>
            </div>
            <button onClick={() => audioRef.current?.pause()}>Pause</button>
            <button onClick={() => audioRef.current?.play()}>Play</button>
        </div>
    );
}

export default MiniPlayer;
