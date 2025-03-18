import mysql from 'mysql';
import {promisify} from 'util';


const connectionPool = mysql.createPool({
    connectionLimit:5,
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database:process.env.MYSQL_DATABASE,
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
