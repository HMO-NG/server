import { v2 as cloudinary } from 'cloudinary';
import {config as env} from 'dotenv'

env({path: '../.env'})
// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name:  process.env.CLOUD_NAME,
  api_key:  process.env.API_KEY,
  api_secret:  process.env.API_SECRET
});

 const uploadImage = async (imagePath) => {

  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: 'hci_crm',
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;
