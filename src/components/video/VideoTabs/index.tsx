import React, { FC } from 'react';
import { upperFirst } from 'lodash';
import { Tabs } from 'antd';
import VideoLyrics from '../VideoLyrics';
import { IVideo } from '@interfaces/api';
import videoTabs, { EnumTabTitle } from '@constants/videoTabs';

import styles from './index.module.scss';

const { TabPane } = Tabs;

export interface IVideoTabsProps {
    video: IVideo;
}

const VideoTabs: FC<IVideoTabsProps> = ({ video }) => {
    const getTabsContent = (title: string): JSX.Element => {
        switch (title) {
            case EnumTabTitle.LYRICS:
                return <VideoLyrics content={video.lyrics} />;
            default:
                return <VideoLyrics content={video.lyrics} />;
        }
    };

    return (
        <Tabs defaultActiveKey="0" className={styles.videoTabs}>
            {videoTabs.map((tab) => (
                <TabPane tab={upperFirst(tab.title)} key={tab.title}>
                    {getTabsContent(tab.title)}
                </TabPane>
            ))}
        </Tabs>
    );
};

export default VideoTabs;
