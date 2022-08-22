import React, { FC } from 'react';
import { upperFirst } from 'lodash';
import { Tabs } from 'antd';
import VideoLyrics from '../VideoLyrics';
import { IVideo } from '@interfaces/api';
import videoTabs from '@constants/videoTabs';

import styles from './index.module.scss';

const { TabPane } = Tabs;

export interface IVideoTabsProps {
    video: IVideo;
}

const VideoTabs: FC<IVideoTabsProps> = ({ video }) => {
    return (
        <Tabs defaultActiveKey="0" className={styles.videoTabs}>
            {videoTabs.map((tab) => (
                <TabPane tab={upperFirst(tab.title)} key={tab.title}>
                    <VideoLyrics content={video.lyrics} />
                </TabPane>
            ))}
        </Tabs>
    );
};

export default VideoTabs;
