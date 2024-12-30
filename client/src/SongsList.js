import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
                        <TableCell align='right'>ID</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Filename</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {songs.map((song) => (
                        <TableRow
                            key={song.title}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="song">
                                {song.id}
                            </TableCell>
                            <TableCell align="left">{song.song_title}</TableCell>
                            <TableCell align="right">{song.artist}</TableCell>
                            <TableCell align="right">{song.filename}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SongsList;
