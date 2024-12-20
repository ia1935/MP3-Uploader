//Handling simple get request to import in App.js
import axios from 'axios';
import React,{useEffect, useState} from 'react';


const SongsList =() =>
{
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() =>
    {
        axios.get('http://localhost:3000/songs').then(response =>{
            setSongs(response.data);
            setLoading(false);
        })
        .catch(error =>
        {
            console.error("Error fetching songs",error);
            setLoading(true);
        });
    })
    return ( 
        <div>    
            <ul>
                {songs.map((song, index) => (
                    <li key={index}>
                        {song.song_title} by {song.artist} 
                    </li>
                ))}
            </ul>
        
    </div>)
};


export default SongsList;