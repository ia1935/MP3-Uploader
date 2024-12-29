//Handling simple get request to import in App.js
import axios from 'axios';
import React,{useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import rootShouldForwardProp from '@mui/material/styles/rootShouldForwardProp';

function useFetchSongs()
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
    },[]);

    return songs;
}

const SongsList =() =>
{
    const songs = useFetchSongs();
    return ( 
        <TableContainer component={songsList}>
            <Table sx={} aria-label='song table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='right'>Title</TableCell>
                        <TableCell align='right'>Artist</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {songs.map((song) =>
                    {
                        <TableRow 
                        key={song.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                            
                        </TableRow>

                    })}
                </TableBody>
            </Table>
        </TableContainer>
    


    
    
    
        //     <div className='table'> 
    //     <table>
    //             <tr>
    //                 <th>Title</th>
    //                 <th>Artist</th>
    //                 <th>File</th>
    //             </tr>
    //             {songs.map((song) =>
    //             {
    //                 return(
    //                     <tr key={song.id}>
    //                         <td>{song.song_title}</td>
    //                         <td>{song.artist} </td>
    //                     </tr>
    //                 )
    //             })}
    //         </table> 
              
        
    // </div>
)
};


export default SongsList;