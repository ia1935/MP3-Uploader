import { FaPlay } from 'react-icons/fa';


const PlayButton = ({ song, onPlay }) => {
    return (
        <div>
            <button onClick={() => onPlay(song)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <FaPlay size={20} color="grey" />
            </button>
        </div>
    );
};

export default PlayButton;
