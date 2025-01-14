import React, {useState, useEffect} from 'react';

import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import DownloadButton from './DownloadButton'
import PlayButton from './PlayButton';
import MiniPlayer from './MiniPlayer';


function useFetchSongs() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/songs')
            .then((response) => {
                setSongs(response.data);
            })
            .catch((error) => {
                console.error('Error fetching songs', error);
            });
    }, []);

    return songs;
}

function App(){
    const songs = useFetchSongs();
    const [currentSong, setCurrentSong] = useState(null);
    
    const miniPlayerContainer = {
        position: 'fixed',
        bottom: '10px', // Distance from the bottom
        left: '50%', // Center horizontally
        transform: 'translateX(-50%)', // Offset by half of its width
        zIndex: 1000, // Ensure it appears above other content
        backgroundColor: 'white', // Background for visibility
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional styling
        borderRadius: '10px', // Rounded corners
        padding: '10px 20px', // Add some padding
    };

    return(
        <div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="song table">
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>Play</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align='right'>Artist</TableCell>
                        <TableCell align="right">Filename</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {songs.map((song) => (
                        <TableRow
                            key={song.title}
                            sx={{ '&:last-child td, &:last-child th': { border: 1} }}
                        >
                            <TableCell component="th" scope="song">
                            <PlayButton song={song} onPlay={setCurrentSong} />  {/*Integration of audio player*/}
                            </TableCell>
                            <TableCell align="right">{song.song_title}</TableCell>
                            <TableCell align="right">{song.artist}</TableCell>
                            <TableCell align='right' component="th" scope="song">
                                <DownloadButton songId={song.id} filename={song.filename} /> {/*Playbutton integration*/}
                            </TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <div style={miniPlayerContainer}>        
            <MiniPlayer song={currentSong} />
        </div>
        </div>
        
        
    );
}


export default App
