import axios from "axios";


async function DeleteItem({song, fetchSongs}) {

    try{
        const songId = song.id;

        const response = await axios.delete(`http://localhost:3000/songs/${songId}`);
        if (response.status ===200){
            alert("File Deleted Successfully")

        }


        
        await fetchSongs();

    }catch(error){
        console.error("Failure to delete item:", error);
        alert('Failed to delete song.');
    }

}

export default DeleteItem