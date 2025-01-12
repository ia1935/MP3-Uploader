// PlayButton js file to create playbutton and when pressed, make a get request from AWS s3

import React from 'react';
import axios from 'axios';

const DownloadButton=({songId,filename}) =>
{
    const handlePress = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/songs/file/${songId}`,{
                responseType:'blob',
        });

        const href = URL.createObjectURL(response.data);

        const link = document.createElement('a');
        link.href = href;

        link.setAttribute('download',`${filename}`);
        
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);



        



        }
        catch(error){
            console.error("error playing song:",error)
        }
    };

    return(
        <a onClick={handlePress}>
            Download Song
        </a>
    );
};

export default DownloadButton;