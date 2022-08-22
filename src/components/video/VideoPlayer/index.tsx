import React, { FC, useState } from 'react';
import numeral from 'numeral';
import dayjs from 'dayjs';
import { upperFirst } from 'lodash';
import { Col, Row, Spin, Typography } from 'antd';
import ReactPlayer from 'react-player';
import { IVideo } from '@interfaces/api';
import Tags from '@components/common/Tags';
import VideoAction from '../VideoAction';
import { LoadingOutlined } from '@ant-design/icons';
import { IItemsEntity, IYoutubeVideo } from '@interfaces/youtube/youtubeVideo';

import styles from './index.module.scss';

const { Text } = Typography;

export interface IVideoPlayerProps {
    video: IVideo;
    youtubeVideo: IYoutubeVideo;
}

const VideoPlayer: FC<IVideoPlayerProps> = ({ video, youtubeVideo }) => {
    const youtubeVideoEntity = youtubeVideo.items?.[0];
    const viewCount = youtubeVideoEntity?.statistics?.viewCount;

    const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

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
        </Row>
    );
};

export default VideoPlayer;
