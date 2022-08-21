import React, { FC, useState } from 'react';
import { IVideo } from '@interfaces/api';
import { Col, Row, Spin, Typography } from 'antd';
import ReactPlayer from 'react-player';
import Tags from '@components/common/Tags';
import SingleVideoAction from '../SingleVideoAction';

import styles from './index.module.scss';

const { Text } = Typography;

export interface IVideoPlayerProps {
    video: IVideo;
}

const VideoPlayer: FC<IVideoPlayerProps> = ({ video }) => {
    const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

    return (
        <Row className={styles.videoPlayer}>
            <Col span={24} className={styles.videoPlayer__container} data-video-loaded={videoLoaded}>
                {videoLoaded === false ? <Spin size="large" /> : null}
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
                    {/* should come from youtube API */}
                    288,065 views - Jan 1, 2022
                </Text>
                <SingleVideoAction video={video} youtubeAPIVideo={{}} />
            </Col>
        </Row>
    );
};

export default VideoPlayer;
