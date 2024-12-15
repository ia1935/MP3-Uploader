import express from 'express';
import {getConnection} from './databaseconn.js';

const app = express();



//Read data
app.get('/songs',async(req,res) =>{
    try{
        const mp3connect =  await getConnection();
        await mp3connect.query("select * from songInfo", (results) =>{
            mp3connect.release();
            res.json(results); 
    })
    }
    catch(error)
    {
        
        console.error("error executing query:",error);
        res.status(500).send("Error occured while fetching data.");
        
    }
});


//Creating info
app.post('/songs', async(req,res) =>
{
    const song_title = req.body.song_title;
    const artist = req.body.artist;
    const filename = req.body.filename;
    try{
    const connection = await getConnection();
    const query = 'insert into songInfo (song_title, artist, filename) values(?,?,?)';
    await connection.query(query, [song_title,artist,filename])
    connection.release();
    }
    catch(error)
    {
        console.error("Error in making entry in DB.",error);
        res.status(500);
    }

});


//Updating Data
app.put('/songs/:id',async (req,res) =>
{
    const song_title = req.body.song_title;
    const artist = req.body.artist;
    const filename = req.body.filename;
    const id = req.params.id;
    try{
        const connection = await getConnection();
        const query = 'update songInfo set song_title =?, artist = ?, filename =? where id=?';
        await connection.query(query,[song_title,artist,filename,id]);
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
        const query = 'delete from songInfo where id=?';
        await connection.query(query,[id]);
        connection.release();
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
