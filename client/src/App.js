import React, {useState, useEffect, useRef} from 'react';

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

//Right Click Functionality
import ContextMenu from './components/ContextMenu/ContextMenu';

//Edit functionality
import { MdOutlineEdit } from "react-icons/md";
import EditMenu from './components/EditMenu/EditMenu';

//Delete Functionality
import { FaTrash } from "react-icons/fa";
import DeleteItem from './components/DeleteItem/DeleteItem';



function useFetchSongs() {
    const [songs, setSongs] = useState([]);

    useEffect(() =>{
        fetchSongs();
    },[]);
    const fetchSongs= async() => {
        try{
            await axios.get('http://localhost:3000/songs')
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


    //State for edit form.
    const [editFormState, setEditFormState] = useState(false);

    //adding right click functionality
    const contextMenuRef = useRef(null);
    const [contextMenu, setContextMenu] = useState({
        position: {
            x:0,
            y:0
        },
        toggled:false,
        song:null,
    })

    const toggleForm = () =>
    {
        setFormState(!formState);
    };

    const toggleEditForm = () =>
    {
        setEditFormState(!editFormState);
    };



    //adding right click for edit/delete
    function handleOnContextMenu(e, song){
        e.preventDefault();

        const contextMenuAttr = contextMenuRef.current.getBoundingClientRect(); 

        const isLeft =e.clientX <window?.innerWidth /2

        let x
        let y = e.clientY;

        if (isLeft){
            x=e.clientX
        }
        else{
            x = e.clientX - contextMenuAttr.width
        }

        setContextMenu({
            position: {
                x,
                y
            },
            toggled:true,
            song:song,
        });

        console.log(contextMenuAttr);

        console.log(song);
    }

    // Close the context menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (contextMenu.toggled && contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
                setContextMenu((prev) => ({
                    ...prev,
                    toggled: false // Close the menu if clicked outside
                }));
            }
        };

        document.addEventListener('click', handleClickOutside);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [contextMenu.toggled]);
    

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
                        key={song.id} // Use unique ID for each row
                        onContextMenu={(e) => handleOnContextMenu(e, song)} // Right-click handler
                        sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                    >
                        <TableCell component="th" scope="row">
                            <PlayButton song={song} onPlay={setCurrentSong} />
                        </TableCell>
                        <TableCell align="right">{song.song_title}</TableCell>
                        <TableCell align="right">{song.artist}</TableCell>
                        <TableCell align="right">
                            <DownloadButton songId={song.id} filename={song.filename} />
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
        
        {editFormState && (
        <div className="overlay" onClick={toggleEditForm}>
        <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <EditMenu so ng={contextMenu.song} fetchSongs={fetchSongs} />
        </div>
        </div>
        )}
        <ContextMenu 
        contextMenuRef={contextMenuRef}
        isToggled={contextMenu.toggled}
        positionX={contextMenu.position.x}
        positionY={contextMenu.position.y}
        buttons={[

            {
                text:"Edit Song",
                icon:<MdOutlineEdit />,
                onClick: () => setEditFormState(true),
                isSpacer: false,
            },
            {
                text:"Delete Song",
                icon:<FaTrash />,
                onClick:() => <DeleteItem song={ContextMenu.song} fetchSongs={fetchSongs} />,
                isSpacer: false,
            },
        ]}/>
        </div>
        
    );
}


export default App
