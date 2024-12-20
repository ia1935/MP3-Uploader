import express from 'express';
import {getConnection} from './databaseconn.js';
import cors from 'cors';
import {uploadFile, deleteFile, getFile} from './s3access.js';
import multer from 'multer';




const app = express();
app.use(cors());
app.use(express.json());


const storage = multer.memoryStorage();
const upload = multer({storage});


//Read data
app.get('/songs', async(req,res) =>{
    const mp3connect = await getConnection();
        mp3connect.query("SELECT * FROM songInfo", (error, results) => {
            mp3connect.release(); // Release the connection back to the pool

            if (error) {
                console.error("Error executing query:", error);
                res.status(500).send("Error occurred while fetching data.");
                return;
            }

            res.json(results);
        });
});


//retrieval of song upon user click for playing song
app.get('/songs/file/:songID', async (req,res) =>
{
    //songid from url
    const {songID} = req.params;

    try{
        //going to make query to get filename given id
        const mp3connect = await getConnection();
        const fileret = 'select filename from songInfo where id=?';
        const [rows] = await mp3connect.query(fileret,[songID]);
        
        //error checking
        if (rows.length===0)
        {
            return res.status(404).json({message:"Song not found"});
            mp3connect.release();
            return;
        }

        //getting filename to search in bucket to retrieve file 
        const filename = rows.filename;
        
        const filestream = await getFile(filename);
        res.setHeader('Content-Type','audio/mpeg');
        filestream.Body.pipe(res);
        mp3connect.release();

    }
    catch(error)
    {
        console.error("Error fetching files",error)
        res.status(500).json({message:"Failed to retrieve file"}    );
    }

});

//Creating song info
app.post('/songs', upload.single('file'), async(req,res) =>
{
    const song_title = req.body.song_title;
    const artist = req.body.artist;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const connection = await getConnection();

    try {
        const query = 'insert into songInfo (song_title, artist) values(?, ?)';
        
        connection.query(query, [song_title, artist], (error, results) => {
            if (error) {
                console.error("Error in making entry in DB.", error);
                return res.status(500).json({ message: 'Error uploading song' });
            }

            const songId = results.insertId;  // Accessing insertId directly from results

            // Generate unique filename with songId
            const filename = `${songId}-${file.originalname}`;

            console.log('Uploading file to S3 with key:', filename);

            // Upload the file to S3 (this should be async, so use promise handling)
            uploadFile(filename, file.buffer)
                .then(() => {
                    const updateQuery = 'update songInfo set filename = ? where id = ?';
                    connection.query(updateQuery, [filename, songId], (updateError, updateResults) => {
                        if (updateError) {
                            console.error("Error updating filename in DB.", updateError);
                            return res.status(500).json({ message: 'Error uploading song' });
                        }

                        // Send success message after everything is complete
                        res.status(200).json({ message: "Song uploaded successfully" });
                    });
                })
                .catch(uploadError => {
                    console.error("Error uploading file to S3.", uploadError);
                    res.status(500).json({ message: 'Error uploading song' });
                });
        });
    } catch (error) {
        console.error("Unexpected error in DB operation.", error);
        res.status(500).json({ message: 'Error uploading song' });
    } finally {
        connection.release();
    }
});


//Updating Data
app.put('/songs/:id',upload.single('file'), async (req,res) =>
{
    const id = req.params.id;
    const song_title = req.body.song_title;
    const artist = req.body.artist;
    const filename = req.body.filename;


    try{
        const connection = await getConnection();



        const fileretrieval = 'select filename where id=?';
        const [result] = await connection.query(fileretrieval,[id]);

        if (result.length===0)
        {
            res.status(404).send("Song not found");
            connection.release();
            return;
        }

        const prevFile = result[0].filename;


        let updatedFile = prevFile;

        if (filename)
        {
            updatedFile = `${id}-${filename}`
        

            await uploadFile(updatedFile,filename.buffer);

            if (prevFile !==updatedFile )
            {
                await deleteFile(prevFile);
            }
        }

        const updateQuery = 'update songInfo set song_title=?, artist=?, filename=? where id=?';
        await connection.query(updateQuery,[song_title,artist,updatedFile,id]);
        
        connection.release();

    }
    catch(error)
    {
        console.error(`Error in making update to DB at ID ${id}.`,error);
        res.status(500);
    }
});



//Deleting Data
app.delete('/songs/:id',async (req,res) =>
{
    const id = req.params.id;
    try{
        const connection = await getConnection();

        //need to grab filename for s3
        const filegrab = 'select filename where id=?';
        const [fileres]= await connection.query(filegrab,[id]);

        if(results.length===0)
        {
            res.status(404).send("Song not found.");
            connection.release();
            return;
        }

        const filename = fileres[0].filename;

        //delete file from bucket
        await deleteFile(filename);


        //now delete from table:
        const query = 'delete from songInfo where id=?';
        await connection.query(query,[id]);

        connection.release();

        console.log("song deleted successfully")
    }
    catch(error)
    {
        console.error(`Failure to delete at ID ${id}.`,error);
        res.status(500);
    }
});



app.listen(3000,() =>
{
    console.log("Server running: http://localhost:3000/songs");
});
