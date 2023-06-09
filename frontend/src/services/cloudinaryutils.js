import { v2 as cloudinary } from "cloudinary";

export const cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name: "YOUR_CLOUD_NAME",
        api_key: "YOUR_API_KEY",
        api_secret: "YOUR_API_SECRET",
    });
};

export const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file,
            { resource_type: "auto", folder: "YOUR_FOLDER_NAME" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        );
    });
};
