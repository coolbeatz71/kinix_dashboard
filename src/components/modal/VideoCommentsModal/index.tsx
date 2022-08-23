import React, { FC, useEffect } from 'react';
import { Drawer } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { IVideo } from '@interfaces/api';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import YoutubeComment from '@components/common/YoutubeComment';
import { IYoutubeComment } from '@interfaces/youtube/youtubeComment';
import ErrorAlert from '@components/common/ErrorAlert';
import { useAppDispatch } from '@redux/store';
import getYoutubeVideoCommentsAction from '@redux/videos/getYoutubeVideoComment';

import styles from './index.module.scss';
import VideoCommentList from '@components/skeleton/VideoCommentList';

export interface IYoutubeCommentsModalProps {
    video: IVideo;
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
}

const YoutubeCommentsModal: FC<IYoutubeCommentsModalProps> = ({ video, openModal, setOpenModal }) => {
    const dispatch = useAppDispatch();
    const { error, loading, data } = useSelector(
        ({ videos: { youtubeVideoComments } }: IRootState) => youtubeVideoComments,
    );

    const onCloseModal = (): void => {
        setOpenModal(false);
    };

    useEffect(() => {
        dispatch(getYoutubeVideoCommentsAction(video.link));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Drawer
            width={520}
            placement="right"
            visible={openModal}
            onClose={onCloseModal}
            title="Commentaires Youtube"
            closeIcon={<CloseCircleOutlined />}
            className={styles.youtubeCommentModal}
            footer={null}
        >
            {error ? (
                <ErrorAlert error={error} closable banner showIcon />
            ) : loading ? (
                <VideoCommentList />
            ) : (
                <YoutubeComment videoLink={video.link} data={(data as IYoutubeComment)?.items} />
            )}
        </Drawer>
    );
};

export default YoutubeCommentsModal;
