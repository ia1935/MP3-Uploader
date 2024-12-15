// Accessor file for AWS S3 to use in server.js and store location in songInfo database
import { createInterface } from "node:readline/promises";
import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,

} from "@aws-sdk/client-s3"

// const s3Client = new s3Client({
//     region: 
// })