//Handling simple get request to import in App.js
import axios from 'axios';
import React,{useEffect, useState} from 'react';


const SongsList =() =>
{
    const [songs, setSongs] = useState([]);



    useEffect(() =>
    {
        axios.get('http://localhost:3000/songs').then(response =>{
            setSongs(response.data);
        })
        .catch(error =>
        {
            console.error("Error fetching songs",error);
        });
    })
    return ( 
        <div className='table'> 
        <table>
                <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Filename</th>
                </tr>
                {songs.map((song,index) =>
                {
                    return(
                        <tr key={index}>
                            <td>{song.song_title}</td>
                            <td>{song.artist}</td>
                        </tr>
                    )
                })}
                
            
            </table> 
              
            {/* <table>
                {songs.map((song, index) => (
                    <li key={index}>
                        {song.song_title} by {song.artist} 
                    </li>
                ))}
            </table> */}
        
    </div>)
};


export default SongsList;