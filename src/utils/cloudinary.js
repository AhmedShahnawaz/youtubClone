import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import { errorLog, successLog } from './logMessage';

cloudinary.config({
    cloud_name : process.env.CLOUDNERY_CLOUD_NAME,
    api_key    : process.env.CLOUDNERY_API_KEY,
    api_secret : process.env.CLOUDNERY_API_SECRET,
    secure     : true
});

const uploadOnCloudnery = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        successLog("file is uploded on cloudnery", response.url)
        return response
    } catch (error) {
        // remove local file path 
        fs.unlinkSync(localFilePath)
        errorLog("file not upload on cloudnery",error)
        return null
    }
}

export { uploadOnCloudnery }