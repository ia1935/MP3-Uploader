import mysql from 'mysql';
import {promisify} from 'util';
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
            connection.query = promisify(connection.query);
            resolve(connection); // Resolve the Promise with the connection
        });
    });
};




export {connectionPool, getConnection};    
