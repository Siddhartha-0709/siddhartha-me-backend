import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
cloudinary.config({ 
  cloud_name: 'djf6ew5uc', 
  api_key: '224572857724586', 
  api_secret: 'bb_dvWvyFeVeTsnrNg3m8kZz1Zo' 
});

const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath){
            return null;
        }
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "blogFiles",
        })
        //file is uploaded successfully
        console.log("File is Uploaded on Cloudinary", response.secure_url);
        fs.unlinkSync(localFilePath);
        return response.secure_url;
    }
    catch(error){
        fs.unlinkSync(localFilePath); //Remove the locally saved temporary file as the upload operation failed
    }
}

export default uploadOnCloudinary