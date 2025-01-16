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

    const [userMessage, setUserMessage] = useState("");

    const handleSubmit = async (event) =>{
		event.preventDefault();
		
		if(!selectedFile || !formData.title || !formData.artist)
		{
		    setUserMessage("Please enter the Title, Artist and enter a valid MP3 File.");
		    return;
		}	

		const data = new formData();
		data.append("title", formData.title);
		data.append("artist" ,formData.artist);
		data.append("mp3file", formData.selectedFile);

		//performing a POST request:

		try{
			const response = await axios.post("http://localhost:3000/songs", data, {
				headers:{ 
				"Content-Type":"multipart/form-data",
				},
			});

			if (response.status ===200){
				setUserMessage("File Uploaded Successfully");
				setFormData({title:"", artist:""}); //resetting current data
				setSelectedFile(null);

			}


		}
		catch(error){
			setMessage("Failed to Upload File");
		}
	
    }
    
    return ();
}


