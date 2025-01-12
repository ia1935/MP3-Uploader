import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//importing other files for player
import DownloadButton from './DownloadButton'

import PlayButton from './PlayButton';

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

const SongsList = () => {
    const songs = useFetchSongs();

    return (
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
                                <PlayButton songId={song.id}></PlayButton>  {/*Integration of audio player*/}
                            </TableCell>
                            <TableCell align="right">{song.song_title}</TableCell>
                            <TableCell align="right">{song.artist}</TableCell>
                            <TableCell component="th" scope="song">
                                <DownloadButton songId={song.id} filename={song.filename}/> {/*Playbutton integration*/}
                            </TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SongsList;
