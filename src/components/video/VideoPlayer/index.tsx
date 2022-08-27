import React, { FC, useEffect, useState } from 'react';
import numeral from 'numeral';
import dayjs from 'dayjs';
import { isEmpty, upperFirst } from 'lodash';
import { useSelector } from 'react-redux';
import { Col, Row, Spin, Typography } from 'antd';
import ReactPlayer from 'react-player';
import VideoRatingModal from '@components/modal/VideoRatingModal';
import { IVideo } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import getSingleVideoRatedByUserAction from '@redux/ratings/getUserRate';
import Tags from '@components/common/Tags';
import VideoAction from '../VideoAction';
import { LoadingOutlined } from '@ant-design/icons';
import { IItemsEntity, IYoutubeVideo } from '@interfaces/youtube';

import styles from './index.module.scss';

const { Text } = Typography;

export interface IVideoPlayerProps {
    video: IVideo;
    youtubeVideo: IYoutubeVideo;
}

const VideoPlayer: FC<IVideoPlayerProps> = ({ video, youtubeVideo }) => {
    const dispatch = useAppDispatch();
    const { data: userRatings } = useSelector(({ ratings: { userRate } }: IRootState) => userRate);

    const youtubeVideoEntity = youtubeVideo.items?.[0];
    const viewCount = youtubeVideoEntity?.statistics?.viewCount;

    const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
    const [openRatingModal, setOpenRatingModal] = useState<boolean>(false);
    const [hasUserRated, setHasUserRated] = useState<boolean>(false);

    useEffect(() => {
        if (!isEmpty(userRatings)) setHasUserRated(true);
    }, [userRatings]);

    useEffect(() => {
        if (video.slug) dispatch(getSingleVideoRatedByUserAction(video.slug));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Row className={styles.videoPlayer}>
            <Col span={24} className={styles.videoPlayer__container} data-video-loaded={videoLoaded}>
                {videoLoaded === false ? <Spin size="large" indicator={<LoadingOutlined spin />} /> : null}
                <ReactPlayer
                    playing
                    controls
                    width={'100%'}
                    height={'100%'}
                    url={video.link}
                    onEnded={() => {
                        !hasUserRated && setOpenRatingModal(true);
                    }}
                    onPause={() => {
                        !hasUserRated && setOpenRatingModal(true);
                    }}
                    onReady={() => setVideoLoaded(true)}
                    className={styles.videoPlayer__container__player}
                />
            </Col>
            <Col span={24} className={styles.videoPlayer__footer}>
                {video.tags && <Tags tags={video.tags} type="video" />}
                <Text data-title>{video.title}</Text>
                <Text data-views className="my-2">
                    {numeral(viewCount).format('0,0')} views -{' '}
                    {upperFirst(dayjs(video.updatedAt).format('MMM D, YYYY'))}
                </Text>
                <VideoAction video={video} youtubeVideoEntity={youtubeVideoEntity as IItemsEntity} />
            </Col>

            <VideoRatingModal slug={video.slug} openModal={openRatingModal} setOpenModal={setOpenRatingModal} />
        </Row>
    );
};

export default VideoPlayer;
