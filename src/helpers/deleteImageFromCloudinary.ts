import { notification } from 'antd';
import { IMAGES_API_CLOUD_NAME } from '@constants/platform';
import cloudinaryUploader from '@services/cloudinary';

const deleteImageFromCloudinary = (imageUrl: string): void => {
    const splitted = imageUrl.split(IMAGES_API_CLOUD_NAME);
    const fileName = splitted[1].split('.')[0];
    const imagePublicId = `${IMAGES_API_CLOUD_NAME}${fileName}`;

    if (imagePublicId) {
        cloudinaryUploader
            .destroy(imagePublicId)
            .then(() => {
                notification.success({
                    key: 'success',
                    maxCount: 1,
                    message: 'Cloud',
                    description: 'Image supprimée avec succès du stockage',
                    placement: 'bottomRight',
                });
            })
            .catch((err: unknown) => {
                notification.error({
                    key: 'error',
                    maxCount: 1,
                    message: 'Erreur',
                    description: err as string,
                    placement: 'bottomRight',
                });
            });
    }
};

export default deleteImageFromCloudinary;
