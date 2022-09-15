import React, { FC } from 'react';
import { Card, Col, Row, Skeleton } from 'antd';
import styles from './index.module.scss';

const PromotionOverviewSkeleton: FC = () => (
    <Card bordered hoverable className={styles.overview} actions={[<Skeleton.Button key="0" shape="square" block />]}>
        <Row align="middle" justify="space-between" gutter={[24, 0]}>
            <Col span={24}>
                <Skeleton.Button active shape="square" block />
            </Col>
        </Row>
    </Card>
);

export default PromotionOverviewSkeleton;
