import React, { FC, useEffect, useState } from 'react';
import { isBoolean, truncate } from 'lodash';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { Button, Card, Col, Grid, Row, Typography } from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';
import { IVideo } from '@interfaces/api';
import { WARNING } from '@constants/colors';
import { IUnknownObject } from '@interfaces/app';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

export interface IRelatedVideoCardProps {
    video: IVideo;
    youtubeAPIVideo: IUnknownObject;
}

const RelatedVideoCard: FC<IRelatedVideoCardProps> = ({ video, youtubeAPIVideo }) => {
    const { lg } = useBreakpoint();
    const updatedTime = dayjs(youtubeAPIVideo?.updatedAt).fromNow();

    const [showOverLay, setShowOverLay] = useState<boolean>(false);
    const overLayStyles = showOverLay ? { opacity: 1 } : { opacity: 0 };

    const handleShowOverlay = (): void => {
        if (lg) setShowOverLay(!showOverLay);
        else setShowOverLay(true);
    };

    useEffect(() => {
        if (isBoolean(lg) && !lg) setShowOverLay(true);
    }, [lg]);

    return (
        <div onMouseEnter={handleShowOverlay} onMouseLeave={handleShowOverlay} className={styles.relatedVideo}>
            <Card bordered={false} hoverable>
                <Row justify="space-between">
                    <Col span={9} className={styles.relatedVideo__cover}>
                        <div className="overlay" style={overLayStyles}>
                            <Button
                                icon={<PlayCircleTwoTone twoToneColor={WARNING} />}
                                shape="circle"
                                type="text"
                                size="large"
                            />
                        </div>
                        <img src={youtubeAPIVideo.thumbnail} alt={video.link} />
                    </Col>
                    <Col span={15} data-body>
                        <Title level={5} data-title>
                            {truncate(video.title, {
                                length: 60,
                            })}
                        </Title>
                        <div className="d-flex flex-column">
                            <Text data-views>{numeral(youtubeAPIVideo.views).format('0,0')} views</Text>
                            <Text data-update-time>{updatedTime}</Text>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default RelatedVideoCard;
