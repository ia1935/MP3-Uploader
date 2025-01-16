import react , {useState} from 'react';
import axios from 'axios';



//To keep track form, we need to have a state to handle if true opening the form, and when pressing submit or cancel closing the page, we also need to account for when pressing submit onlcick we call our function to make a post request.
//also need to allow for user to put in a mp3 file.
export default function AddSongForm()
{
    //function is clicked, we need to make this a form, and when submit button is pressed we have to call another function handling the POST request, or handle it here

    const [formData, setFormData] = useState({
        title:"",
        artist:"",
    });

    const [selectedFile, setSelectedFile] = useState(null);
    
    return (
        <form>
            <input name='title' />
            
        </form>
    );
}


