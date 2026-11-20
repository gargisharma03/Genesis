import cloudinary from "../../config/cloudinary.js";

class CloudinaryService {

    async uploadFile(localFilePath) {

        return await cloudinary.uploader.upload(localFilePath, {

            resource_type: "raw",

            folder: "genesis/papers",

            use_filename: true,

            unique_filename: true,

        });

    }

    async uploadImage(localFilePath, folder = "genesis/images") {

        return await cloudinary.uploader.upload(localFilePath, {

            folder,

        });

    }
    async downloadFile(url) {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
            `Failed to download file: ${response.status}`
            );
        }

        const arrayBuffer =
            await response.arrayBuffer();

        return Buffer.from(arrayBuffer);
    }

    async deleteFile(publicId, resourceType = "raw") {

        return await cloudinary.uploader.destroy(publicId, {

            resource_type: resourceType,

        });

    }

}

export default new CloudinaryService();