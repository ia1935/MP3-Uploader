import react from 'react'
import axios from 'axios';

const PlayButton = ({songId}) =>
{
    const handlePlay = async() =>
    {
        try{
            const response = await axios.get(`http:`)
        }
        catch(error)
        {
            console.error("error playing song",error);
        }
    };
};

