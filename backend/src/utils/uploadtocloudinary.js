import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (fileBuffer, folder = process.env.CLOUDINARY_PAPER_FOLDER) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // PDFs are uploaded as raw files
        folder,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

export default uploadToCloudinary;