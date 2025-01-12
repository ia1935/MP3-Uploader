//MiniPlayer button bottom screen 


import React,{useState} from "react";
import { FaPause, FaPlay } from 'react-icons/fa';



const MiniPlayer = ({currentSong, audio}) => {
    const [isPlaying, setisPlaying] = useState(true);

    const togglePlayPause = () =>
    {
        if (isPlaying){
            audio.pause();
        }
        else{
            audio.play();
        }
        setisPlaying(!isPlaying);

    };

    return (
        <div style={{position:'fixed',
            bottom:0,
            display:'flex',
            alignItems:'center',
            padding: '10px'
        }}>
            <div>
            <h4>{currentSong.songTitle}</h4>
            </div>
            <div>
            <button onClick={togglePlayPause} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
      </div>
            
    </div>
        
    );
}

export default MiniPlayer