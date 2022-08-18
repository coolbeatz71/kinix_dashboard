import axios from 'axios';
import { notification } from 'antd';
import { SHA1 } from 'crypto-js';
import { IMAGES_API_KEY, IMAGES_API_PRESET, IMAGES_API_URL, IMAGES_API_SECRET } from '@constants/platform';

const uploadImageCloudinary = async (
    file: File,
    currentImage: string | null,
    folderName: 'articles' | 'avatars',
): Promise<unknown> => {
    const isAvatar = folderName === 'avatars';

    const formData = new FormData();

    formData.append('folder', folderName);
    formData.append('file', file, file.name);
    formData.append('api_key', IMAGES_API_KEY);

    if (!currentImage) formData.append('upload_preset', isAvatar ? 'trdvi7fs' : IMAGES_API_PRESET);
    else {
        const splitted = currentImage?.split(`${folderName}`);
        const fileName = splitted[1]?.split('.')[0];
        const imagePublicId = `${fileName}`;
        formData.append('public_id', imagePublicId);
        formData.append('upload_preset', isAvatar ? 'trdvi7fs' : IMAGES_API_PRESET);
    }

    try {
        const { data } = await axios.post(`${IMAGES_API_URL}/upload`, formData);
        return data.url;
    } catch (err) {
        notification.error({
            key: 'error',
            maxCount: 1,
            message: 'Erreur',
            placement: 'topRight',
            description: (err as Error)?.message,
        });
        return err;
    }
};

export const deleteImageFromCloudinary = async (
    imageUrl: string,
    folderName: 'articles' | 'avatars',
): Promise<unknown> => {
    const splitted = imageUrl?.split(folderName);
    const fileName = splitted[1]?.split('.')[0];
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
        try {
            const data = await axios.post(`${IMAGES_API_URL}/image/destroy`, formData);
            if (data) {
                notification.success({
                    maxCount: 1,
                    key: 'success',
                    message: 'Upload',
                    placement: 'topRight',
                    description: 'Image supprimée avec succès du cloud',
                });
            }
            return data;
        } catch (err) {
            notification.error({
                maxCount: 1,
                key: 'error',
                message: 'Erreur',
                placement: 'topRight',
                description: "Impossible de supprimer l'image du cloud",
            });
        }
    }
};

export default uploadImageCloudinary;
