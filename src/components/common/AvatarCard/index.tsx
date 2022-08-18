import React, { FC, useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { EditOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import uploadImageCloudinary from '@services/cloudinary';
import { Avatar, Button, Typography, Upload, message, notification, Spin } from 'antd';
import { useAppDispatch } from '@redux/store';
import { getAvatarColor } from '@helpers/getAvatarColor';
import updateAvatar, { resetUpdateAvatarAction } from '@redux/users/updateAvatar';
import 'antd/es/slider/style';

import styles from './index.module.scss';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';

const { Title } = Typography;

export interface IAvatarCardProps {
    userName: string;
    image: string | null;
    loading: boolean;
}

type FileType = string | boolean | void | File | Blob;

const AvatarCard: FC<IAvatarCardProps> = ({ image, userName, loading }) => {
    const dispatch = useAppDispatch();
    const [avatar, setAvatar] = useState<string | null>(image);
    const { loading: updating } = useSelector(({ users: { updateAvatar } }: IRootState) => updateAvatar);

    useEffect(() => {
        resetUpdateAvatarAction()(dispatch);
    }, [dispatch]);

    const beforeCrop = (file: File): boolean => {
        const isFileBig = file.size > 1500000;
        const isPNG = file.type === 'image/png';
        const isJPG = file.type === 'image/jpeg';

        if (isFileBig) {
            message.error('Fichier est trop volumineux. La taille maximale autorisée est de 1,5 Mo');
            return false;
        }
        if (!isPNG && !isJPG) {
            message.error('Seules les images au format PNG and JPG sont acceptées');
            return false;
        }
        return true;
    };

    const onUpload = async (file: FileType): Promise<void> => {
        try {
            const imageUrl = await uploadImageCloudinary(file as File, image, 'avatars');
            if (typeof imageUrl === 'string') {
                dispatch(
                    updateAvatar({
                        dispatch,
                        avatar: imageUrl as string,
                    }),
                ).then((response) => {
                    if (response.type === 'users/updateAvatar/fulfilled') {
                        setAvatar(imageUrl as string);
                        notification.info({
                            maxCount: 1,
                            key: 'success',
                            message: 'Upload',
                            placement: 'topRight',
                            description: 'Photo de profil uploadée avec succès',
                        });
                    }
                });
            }
        } catch (err) {
            notification.error({
                maxCount: 1,
                key: 'error',
                message: 'Erreur',
                placement: 'topRight',
                description: (err as Error)?.message,
            });
        }
    };

    return (
        <div className={styles.avatarCard}>
            <Title level={5} className="mb-4">
                Photo de profil
            </Title>
            <div>
                <Avatar
                    size={120}
                    src={avatar}
                    icon={
                        loading || updating ? (
                            <Spin size="large" indicator={<LoadingOutlined spin />} />
                        ) : (
                            <UserOutlined />
                        )
                    }
                    style={{ backgroundColor: getAvatarColor(userName) }}
                />
                <ImgCrop
                    grid
                    zoom
                    rotate
                    shape="round"
                    onModalOk={onUpload}
                    modalCancel="Annuler"
                    beforeCrop={beforeCrop}
                    modalTitle="Modifier image"
                    modalClassName={styles.avatarCard__cropper}
                    cropperProps={{
                        cropSize: {
                            width: 250,
                            height: 250,
                        },
                    }}
                >
                    <Upload showUploadList={false} accept="image/png, image/jpeg">
                        <Button
                            shape="circle"
                            type="primary"
                            className={styles.avatarCard__button}
                            icon={<EditOutlined />}
                        />
                    </Upload>
                </ImgCrop>
            </div>
        </div>
    );
};

export default AvatarCard;
