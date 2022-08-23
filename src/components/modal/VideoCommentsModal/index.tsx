import React, { FC, useCallback, useEffect } from 'react';
import { Drawer } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { IVideo } from '@interfaces/api';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import YoutubeComment from '@components/common/YoutubeComment';
import { IYoutubeComment } from '@interfaces/youtube/youtubeComment';
import ErrorAlert from '@components/common/ErrorAlert';
import VideoCommentListSkeleton from '@components/skeleton/VideoCommentList';
import { useAppDispatch } from '@redux/store';
import getYoutubeVideoCommentsAction from '@redux/videos/getYoutubeVideoComment';

import styles from './index.module.scss';
import CreateYoutubeComment from '@components/form/CreateYoutubeComment';

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

    const reloadVideoComments = useCallback(() => {
        dispatch(getYoutubeVideoCommentsAction(video.link));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        reloadVideoComments();
    }, [reloadVideoComments]);

    return (
        <Drawer
            width={520}
            placement="right"
            visible={openModal}
            onClose={onCloseModal}
            title="Commentaires Youtube"
            closeIcon={<CloseCircleOutlined />}
            className={styles.youtubeCommentModal}
            footer={
                <div className="m-4">
                    <CreateYoutubeComment videoLink={video.link} reload={reloadVideoComments} />
                </div>
            }
        >
            {error ? (
                <ErrorAlert error={error} closable banner showIcon />
            ) : loading ? (
                <VideoCommentListSkeleton />
            ) : (
                <YoutubeComment videoLink={video.link} data={(data as IYoutubeComment)?.items} />
            )}
        </Drawer>
    );
};

export default YoutubeCommentsModal;
