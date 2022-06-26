import cloudinary from 'cloudinary';
import { IMAGES_API_CLOUD_NAME, IMAGES_API_KEY, IMAGES_API_SECRET } from '../constants/platform';

cloudinary.v2.config({
    cloud_name: IMAGES_API_CLOUD_NAME,
    api_key: IMAGES_API_KEY,
    api_secret: IMAGES_API_SECRET,
});

export default cloudinary.v2.uploader;
