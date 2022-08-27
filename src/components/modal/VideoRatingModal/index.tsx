import React, { FC, useState } from 'react';
import Lottie from 'react-lottie';
import { Button, Modal, Rate, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import getLottieOptions from '@helpers/getLottieOptions';
import rating from '@assets/rating_anim.json';

import styles from './index.module.scss';

const { Text } = Typography;

export interface VideoRatingModalProps {
    slug: string;
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
}

const VideoRatingModal: FC<VideoRatingModalProps> = ({ slug, openModal, setOpenModal }) => {
    const [success, setSuccess] = useState<string>('');
    const [hasRated, setHasRated] = useState<boolean>(false);
    const [rateCount, setRateCount] = useState<number>(0);

    const lottieOps = getLottieOptions(rating);

    const onCloseModal = (): void => {
        setOpenModal(false);
    };

    const onSubmitRating = (): void => {
        console.log(rateCount, slug);
    };

    return (
        <Modal
            centered
            width={420}
            footer={null}
            destroyOnClose
            visible={openModal}
            onCancel={onCloseModal}
            className={styles.ratingModal}
            closeIcon={<CloseCircleOutlined />}
        >
            <Lottie width={250} height={100} options={lottieOps} />

            <Text className="d-flex justify-content-center">Donnez nous votre impression sur la vidéo</Text>

            <div className="m-3 d-flex justify-content-center">
                <Rate
                    value={rateCount}
                    onChange={(val) => {
                        setHasRated(true);
                        setRateCount(val);
                    }}
                />
            </div>

            <Button block size="large" onClick={() => onSubmitRating()} type="primary" disabled={!hasRated}>
                Envoyer
            </Button>
        </Modal>
    );
};

export default VideoRatingModal;
