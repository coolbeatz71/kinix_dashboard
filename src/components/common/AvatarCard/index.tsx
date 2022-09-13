import React, { FC, useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { EditOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import uploadImageCloudinary from '@services/cloudinary';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import { Avatar, Button, Typography, Upload, message, notification, Spin, Card } from 'antd';
import { useAppDispatch } from '@redux/store';
import { getAvatarColor } from '@helpers/getAvatarColor';
import updateAvatarAction, { resetUpdateAvatarAction } from '@redux/auth/updateAvatar';
import 'antd/es/slider/style';

import styles from './index.module.scss';

const { Title } = Typography;

export interface IAvatarCardProps {
    userName: string;
    loading: boolean;
    image: string | null;
}

type FileType = string | boolean | void | File | Blob;

const AvatarCard: FC<IAvatarCardProps> = ({ image, userName, loading }) => {
    const dispatch = useAppDispatch();
    const [avatar, setAvatar] = useState<string | null>(image);
    const { loading: updating } = useSelector(({ auth: { updateAvatar } }: IRootState) => updateAvatar);

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
                    updateAvatarAction({
                        dispatch,
                        avatar: imageUrl as string,
                    }),
                ).then((response) => {
                    if (response.type === 'auth/updateAvatar/fulfilled') {
                        setAvatar(imageUrl as string);
                        notification.success({
                            maxCount: 1,
                            key: 'success',
                            message: 'Youpi!',
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
                message: 'Oops!',
                placement: 'topRight',
                description: (err as Error)?.message,
            });
        }
    };

    return (
        <Card bordered className={styles.avatarCard}>
            <Title level={4}>Photo de profil</Title>
            <div className="d-flex justify-content-center">
                <Avatar
                    size={98}
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
                <div>
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
                                icon={<EditOutlined />}
                                className={styles.avatarCard__button}
                            />
                        </Upload>
                    </ImgCrop>
                </div>
            </div>
        </Card>
    );
};

export default AvatarCard;
