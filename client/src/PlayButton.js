import react from 'react'
import axios from 'axios';

const PlayButton =({songId}) =>
{
    const playSong = async() =>
    {
        try{
            const response = await axios.get(`http://localhost:3000/songs/file/${songId}`,
                {
                    responseType:'blob',
                }
            );

            const audioBlob = response.data;

            const audioURL = URL.createObjectURL(audioBlob);

            const audio = new Audio(audioURL);
            audio.play();

            //clean up url after audio finishes playing
            audio.onended=() =>
                {
                    URL.revokeObjectURL(audioURL);
                }; 
        }
        catch(error)
        {
            console.error("error playing song",error);
        }
    };

    return(
        <div>

            <button onClick={playSong}>
                Play Song
            </button>         
        </div>
    );
};

export default PlayButton