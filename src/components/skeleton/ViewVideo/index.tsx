import React, { FC } from 'react';
import { Col, Row, Skeleton } from 'antd';

import styles from './index.module.scss';

const ViewVideo: FC = () => {
    const relatedVideos = Array.from(Array(4).keys()).map((i) => (
        <Skeleton.Button key={i} size="large" active block className={styles.videoSkeleton__related} />
    ));

    return (
        <Row justify="space-between" gutter={18} className={styles.videoSkeleton}>
            <Col xs={24} sm={24} md={24} lg={16}>
                <Skeleton.Image className={styles.videoSkeleton__player} active />
                <Skeleton.Button className={styles.videoSkeleton__tab} active block />
            </Col>

            <Col lg={8}>
                <Skeleton.Button active block />
                {relatedVideos}
            </Col>
        </Row>
    );
};

export default ViewVideo;
