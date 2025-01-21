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



//Add button 
import { CiSquarePlus } from "react-icons/ci";
import AddSongForm from './AddSong';


function useFetchSongs() {
    const [songs, setSongs] = useState([]);

    useEffect(() =>{
        fetchSongs();
    },[]);
    const fetchSongs= async() => {
        try{
            axios.get('http://localhost:3000/songs')
                .then((response) => {
                    setSongs(response.data);
                });
                
                
        }catch(error) {
            console.error('Error fetching songs', error);
        }
    };

    return {songs, setSongs, fetchSongs};
}

function App(){
    const {songs, setSongs, fetchSongs} = useFetchSongs();
    const [currentSong, setCurrentSong] = useState(null);

    const [formState, setFormState] = useState(false);

    const toggleForm = () =>
    {
        setFormState(!formState);
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
                                <DownloadButton songId={song.id} filename={song.filename} /> {/* Download button integration*/}
                            </TableCell>
                            
                        </TableRow> 
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <div style={{
        position: 'fixed',
        bottom: '10px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 1000, 
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
        borderRadius: '10px', 
        padding: '10px 20px',
    }}>        
            <MiniPlayer song={currentSong} />
        </div>
       
        <div>
            <button style={{position:'fixed', bottom:'20px', right:'20px'}} onClick={toggleForm}>
                <CiSquarePlus size={30} color='black' />
            </button>
        
        {formState && (
        <div className="overlay" onClick={toggleForm}>
        <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <AddSongForm setSongs={setSongs} fetchSongs={fetchSongs} />
        </div>
        </div>
        )}

        </div>
        </div>
        
    );
}


export default App
