import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: process.env.AWS_REGION });
import { AppError } from "../helpers/ global.error.handler";
import { ERROR_MESSAGES } from "../../constants/errorMessage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import path from "path";

const bucketName = process.env.AWS_BUCKET_NAME as string;

/**
 * Upload a file to AWS S3
 * @param fileBuffer - The file buffer
 * @param fileName - The name of the file to be stored in S3
 * @param folder - The folder in the S3 bucket where the file will be stored
 * @param contentType - The MIME type of the file
 * @returns The S3 URL of the uploaded file
 */

  export const uploadToS3 = async (
    fileBuffer: Buffer,
    fileName: string,
    folder: string,
    contentType: string
  ): Promise<{ s3Url: string; key: string }> => {
    try {
      const timestamp = Date.now();
    const cleanFileName = fileName.replace(/[^\w\d\-_.]+/g, "_"); 
    const key = `${folder}/${timestamp}-${cleanFileName}`;
  
      const uploadParams = {
        Bucket: bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
      };
  
      const putCommand = new PutObjectCommand(uploadParams);
      await s3.send(putCommand);
  
      const s3Url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  
      return { s3Url, key };
    } catch (error) {
      throw new AppError(ERROR_MESSAGES.S3_UPLOAD_ERROR, 500);
    }
  };


  export const generatePresignedUrl = async (key: string): Promise<string> => {
    const decodedKey = decodeURIComponent(key);
  
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: decodedKey,
    });
  
    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 10 });
    return url;
  };


export const deleteFromS3 = async (key: string): Promise<void> => {
  try {
    const deleteParams = {
      Bucket: bucketName,
      Key: key,
    };
    const command = new DeleteObjectCommand(deleteParams);
    await s3.send(command);
  } catch (error) {
    console.error("S3 Delete Error:", error);
    throw new AppError(ERROR_MESSAGES.S3_DELETE_ERROR, 500);
  }
};