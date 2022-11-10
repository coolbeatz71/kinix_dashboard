import React, { FC, useEffect, useState } from 'react';
import { isBoolean, truncate } from 'lodash';
import dayjs from 'dayjs';
import getVideoId from 'get-video-id';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Grid, Rate, Row, Typography } from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';
import { VIDEO_PATH } from '@constants/paths';
import { IVideo } from '@interfaces/api';
import getYoutubeVideoThumbnail from '@helpers/getYoutubeVideoThumbnail';
import { WARNING } from '@constants/colors';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

export interface IRelatedVideoCardProps {
    video: IVideo;
}

const RelatedVideoCard: FC<IRelatedVideoCardProps> = ({ video }) => {
    const { lg } = useBreakpoint();
    const createdTime = dayjs(video.createdAt).fromNow();
    const videoId = getVideoId(video.link).id;
    const thumbnail = getYoutubeVideoThumbnail(String(videoId));

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
        <Link to={`${VIDEO_PATH}/watch/${video.slug}`} className="text-decoration-none">
            <Card
                bordered
                className={styles.relatedVideo}
                onMouseEnter={handleShowOverlay}
                onMouseLeave={handleShowOverlay}
            >
                <Row justify="space-between">
                    <Col span={8} className={styles.relatedVideo__cover}>
                        <div className="overlay" style={overLayStyles}>
                            <Button
                                icon={<PlayCircleTwoTone twoToneColor={WARNING} />}
                                type="text"
                                size="large"
                                shape="circle"
                            />
                        </div>
                        <img src={thumbnail} alt={video.link} />
                    </Col>
                    <Col span={16} data-body>
                        <Title level={5} data-title>
                            {truncate(video.title, {
                                length: 60,
                            })}
                        </Title>
                        <div className="d-flex flex-column align-items-start">
                            <Rate disabled defaultValue={Number(video.avgRate)} />
                            <Text data-created-time>{createdTime}</Text>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Link>
    );
};

export default RelatedVideoCard;
