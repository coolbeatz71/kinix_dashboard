import axios from 'axios';
import { notification } from 'antd';
import { SHA1 } from 'crypto-js';
import { IMAGES_API_KEY, IMAGES_API_URL } from '@constants/platform';
import { IMAGES_API_SECRET } from '../constants/platform';

const deleteImageFromCloudinary = (imageUrl: string): void => {
    const folderName = 'articles';

    const splitted = imageUrl.split(folderName);
    const fileName = splitted[1].split('.')[0];
    const imagePublicId = `${folderName}${fileName}`;
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
