import axios from 'axios';
import { notification } from 'antd';
import { SHA1 } from 'crypto-js';
import { IMAGES_API_KEY, IMAGES_API_URL, IMAGES_API_SECRET } from '@constants/platform';

const uploadImageCloudinary = async (
    file: File,
    currentImage: string | null | undefined,
    folderName: 'articles' | 'avatars' | 'ads' | 'stories',
): Promise<unknown> => {
    const formData = new FormData();

    formData.append('folder', folderName);
    formData.append('file', file, file.name);
    formData.append('api_key', IMAGES_API_KEY);

    if (!currentImage) {
        const timestamp = new Date().getTime();
        const plainText = `folder=${folderName}&timestamp=${timestamp}${IMAGES_API_SECRET}`;
        formData.append('timestamp', `${timestamp}`);
        formData.append('signature', `${SHA1(plainText)}`);
    } else {
        const splitted = currentImage?.split(`${folderName}/`);
        const fileName = splitted[1]?.split('.')[0];
        const imagePublicId = `${fileName}`;
        const timestamp = new Date().getTime();
        const plainText = `folder=${folderName}&public_id=${imagePublicId}&timestamp=${timestamp}${IMAGES_API_SECRET}`;

        formData.append('public_id', imagePublicId);
        formData.append('timestamp', `${timestamp}`);
        formData.append('signature', `${SHA1(plainText)}`);
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

// TODO: should call this function on delete articles/ads/stories
export const deleteImageFromCloudinary = async (
    imageUrl: string,
    folderName: 'articles' | 'avatars' | 'ads' | 'stories',
): Promise<unknown> => {
    const splitted = imageUrl?.split(folderName);
    const fileName = splitted[1]?.split('.')[0];
    const imagePublicId = `${folderName}${fileName}`;
    const timestamp = new Date().getTime();
    const plainText = `public_id=${imagePublicId}&timestamp=${timestamp}${IMAGES_API_SECRET}`;

    const formData = new FormData();

    formData.append('api_key', IMAGES_API_KEY);
    formData.append('public_id', imagePublicId);
    formData.append('timestamp', `${timestamp}`);
    formData.append('signature', `${SHA1(plainText)}`);

    if (imagePublicId) {
        try {
            const data = await axios.post(`${IMAGES_API_URL}/image/destroy`, formData);
            if (data) {
                notification.success({
                    maxCount: 1,
                    key: 'success',
                    message: 'Youpi!',
                    placement: 'topRight',
                    description: 'Image supprimée avec succès',
                });
            }
            return data;
        } catch (err) {
            notification.error({
                maxCount: 1,
                key: 'error',
                message: 'Oops!',
                placement: 'topRight',
                description: "Impossible de supprimer l'image",
            });
        }
    }
};

export default uploadImageCloudinary;
