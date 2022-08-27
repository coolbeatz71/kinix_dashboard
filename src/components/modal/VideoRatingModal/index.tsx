import React, { FC, Fragment, useState } from 'react';
import Lottie from 'react-lottie';
import { useSelector } from 'react-redux';
import { Button, Modal, notification, Rate, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import getLottieOptions from '@helpers/getLottieOptions';
import { useAppDispatch } from '@redux/store';
import addVideoRatingAction from '@redux/ratings/add';
import FormSuccessResult from '@components/common/FormSuccessResult';
import { IRootState } from '@redux/reducers';
import getSingleVideoRatedByUserAction from '@redux/ratings/getUserRate';
import rating from '@assets/rating_anim.json';

import styles from './index.module.scss';

const { Text } = Typography;

export interface VideoRatingModalProps {
    slug: string;
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
}

const VideoRatingModal: FC<VideoRatingModalProps> = ({ slug, openModal, setOpenModal }) => {
    const dispatch = useAppDispatch();
    const lottieOps = getLottieOptions(rating);
    const [success, setSuccess] = useState<string>('');

    const [rateCount, setRateCount] = useState<number>(0);
    const [hasRated, setHasRated] = useState<boolean>(false);

    const { error, loading } = useSelector(({ ratings: { add } }: IRootState) => add);

    const onCloseModal = (): void => {
        setOpenModal(false);
    };

    const onSubmitRating = (): void => {
        dispatch(addVideoRatingAction({ slug, count: rateCount })).then((res) => {
            if (res.type === 'ratings/add/fulfilled') {
                setSuccess("Merci d'avoir laisser votre précieux avis!");
                dispatch(getSingleVideoRatedByUserAction(slug));
            } else if (res.type === 'ratings/add/rejected') {
                notification.error({
                    maxCount: 1,
                    key: 'error',
                    message: 'Oops!',
                    placement: 'topRight',
                    description: error?.message,
                });
            }
        });
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
            {success ? (
                <FormSuccessResult title={success} onClose={onCloseModal} />
            ) : (
                <Fragment>
                    <Lottie width={250} height={100} options={lottieOps} />

                    <Text className="d-flex text-center justify-content-center">
                        Voulez-vous nous partager votre impression sur cette vidéo
                    </Text>
                    <div className="my-5 d-flex justify-content-center">
                        <Rate
                            value={rateCount}
                            onChange={(val) => {
                                setHasRated(true);
                                setRateCount(val);
                            }}
                        />
                    </div>
                    <Button
                        block
                        size="large"
                        type="primary"
                        loading={loading}
                        disabled={!hasRated}
                        onClick={() => onSubmitRating()}
                    >
                        Envoyer
                    </Button>
                </Fragment>
            )}
        </Modal>
    );
};

export default VideoRatingModal;
