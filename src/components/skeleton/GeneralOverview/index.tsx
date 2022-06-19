import React, { FC } from 'react';
import { Card, Col, Row, Skeleton } from 'antd';
import styles from './index.module.scss';

const GeneralOverviewSkeleton: FC = () => {
    return (
        <Card
            bordered
            hoverable
            className={styles.overview}
            actions={[
                <Skeleton.Button key="0" shape="square" block />,
                <Skeleton.Button key="1" shape="square" block />,
            ]}
        >
            <Row align="middle" justify="space-between" gutter={[24, 0]}>
                <Col span={8}>
                    <Skeleton.Button active shape="square" block />
                </Col>
                <Col span={16}>
                    <Skeleton.Button active shape="square" block />
                </Col>
            </Row>
        </Card>
    );
};

export default GeneralOverviewSkeleton;
