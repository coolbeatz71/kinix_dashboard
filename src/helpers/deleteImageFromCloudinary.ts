import { notification } from 'antd';
import { SHA1 } from 'crypto-js';
import { IMAGES_API_CLOUD_NAME, IMAGES_API_KEY, IMAGES_API_URL } from '@constants/platform';
import { IMAGES_API_SECRET } from '../constants/platform';
import axios from '@services/axios';

const deleteImageFromCloudinary = (imageUrl: string): void => {
    const splitted = imageUrl.split(IMAGES_API_CLOUD_NAME);
    const fileName = splitted[1].split('.')[0];
    const imagePublicId = `${IMAGES_API_CLOUD_NAME}${fileName}`;
    const timestamp = new Date().getTime();
    const plainText = `public_id=${imagePublicId}&timestamp=${timestamp}${IMAGES_API_SECRET}`;
    const signature = SHA1(plainText);

    const formData = new FormData();
    formData.append('public_id', imagePublicId);
    formData.append('signature', `${signature}`);
    formData.append('api_key', IMAGES_API_KEY);
    formData.append('timestamp', `${timestamp}`);

    if (imagePublicId) {
        axios
            .post(`${IMAGES_API_URL}/image/destroy`, formData)
            .then(() => {
                notification.success({
                    key: 'success',
                    maxCount: 1,
                    message: 'Cloud',
                    description: 'Image supprimée avec succès du cloud',
                    placement: 'topRight',
                });
            })
            .catch((err) => {
                notification.error({
                    key: 'error',
                    maxCount: 1,
                    message: 'Erreur',
                    description: err?.message,
                    placement: 'topRight',
                });
            });
    }
};

export default deleteImageFromCloudinary;
