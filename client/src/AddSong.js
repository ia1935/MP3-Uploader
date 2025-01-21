import react , {useState} from 'react';
import axios from 'axios';



//To keep track form, we need to have a state to handle if true opening the form, and when pressing submit or cancel closing the page, we also need to account for when pressing submit onlcick we call our function to make a post request.
//also need to allow for user to put in a mp3 file.
export default function AddSongForm({fetchSongs})
{
    //function is clicked, we need to make this a form, and when submit button is pressed we have to call another function handling the POST request, or handle it here

    const [formData, setFormData] = useState({
        title:"",
        artist:"",
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const [userMessage, setUserMessage] = useState("");


	  // Handle file selection
	  const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file && file.type === "audio/mpeg") {
		  setSelectedFile(file);
		  setUserMessage(""); // Clear any previous messages
		} else {
		  setUserMessage("Please select a valid MP3 file.");
		  setSelectedFile(null);
		}
	  };

	  // Handle text input changes
	  const handleTextChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
		  ...prevData,
		  [name]: value,
		}));
	  };



    const handleSubmit = async (event) =>{
		event.preventDefault();
		
		if(!selectedFile || !formData.title || !formData.artist)
		{
		    setUserMessage("Please enter the Title, Artist and enter a valid MP3 File.");
		    return;
		}	

		const data = new FormData();
		data.append("song_title", formData.title);
		data.append("artist" ,formData.artist);
		data.append("file", selectedFile);

		//performing a POST request:

		try{
			console.log(formData)
			console.log(selectedFile)
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
			fetchSongs();


		}
		catch(error){
			setUserMessage("Failed to Upload File");
			console.error("Error submitting POST Request.", error);
		}
	
    }
    
    return (<div className='formbox'>
		<form>
			<div>
				<input className='input' placeholder='Title' type='text' id='song_title'  
				name='title'
				value={formData.title}	onChange={handleTextChange} required />
			</div>
			<div>
				<input className='input' placeholder='Artist' type='text' id='artist' 
				name='artist' 
				value={formData.artist} onChange={handleTextChange} required />
			</div>
			<div>
				<label htmlFor='mp3File'>MP3 File: </label>
				<input type='file' id='mp3File' accept='.mp3' name='file' 
				onChange={handleFileChange} required />
			</div>
			{/* Submit and cancel buttons */}
			<div>
				<button type='submit' onClick={handleSubmit}>Submit </button>
			</div>
		</form>
	</div>);
}


