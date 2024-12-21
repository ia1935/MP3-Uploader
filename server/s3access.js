// Accessor file for AWS S3 to use in server.js and store location in songInfo database
import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,

} from "@aws-sdk/client-s3"

import dotenv from 'dotenv';

dotenv.config({path: 'awsinfo.env'});



const bucketName = process.env.AWS_BUCKET_NAME;

const s3 = new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const uploadFile = async ( key, body) =>
{
    const command =new PutObjectCommand({
        Bucket: bucketName,
        Key:key,
        Body:body,
        ContentType:'audio/mpeg',
    });
    return await s3.send(command);
}

const deleteFile = async (key)=>
{
    const command = new DeleteObjectCommand({
        Bucket:bucketName,
        Key:key,
    });
    return await s3.send(command);
}


const getFile = async (key) =>
{
    const command = new GetObjectCommand({
        Bucket:bucketName,
        Key:key,
    });
    return await s3.send(command);
}


export {uploadFile, deleteFile, getFile};


