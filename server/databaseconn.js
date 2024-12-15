import mysql from 'mysql';
const connectionPool = mysql.createPool({
    connectionLimit:5,
    host:'localhost',
    user:'root',
    password: 'password',
    database:'mp3database'
});


const getConnection =()  =>
{
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((error, connection) => {
            if (error) {
                console.error('Error getting a connection from the pool:', error.message);
                return reject(error); // Reject the Promise with the error
            }
            resolve(connection); // Resolve the Promise with the connection
        });
    });
};




// Create database using these 2 lines:
// const createDatabaseQuery = 'create database if not exists mp3database';

// connectionPool.query(createDatabaseQuery);

//creating song info table
//Needs:
//unique id, song title, artist,
// const createSongInfo = `create table if not exists songInfo (id int AUTO_INCREMENT PRIMARY KEY, song_title text, artist text, filename text);`;
// connectionPool.query(createSongInfo);

//adding dummy entry to test out server connectivity
// const initialdataAddition = `insert into songInfo (song_title,artist,filename) values ('Mortal Man','Kendrick Lamar','Users/Music/Mortal_man.mp3')`;
// connection.query(initialdataAddition, (error, results)=>
// {
//     if (error)
//     {
//         console.error("Issue adding info",error);
//         return;
//     }
//     console.log("Information successfully added")
// });

export {connectionPool, getConnection};    
