import React, { FC } from 'react';
import { Col, Row, Skeleton, Space } from 'antd';
import styles from './index.module.scss';

const ViewArticleSkeleton: FC = () => {
    const paragraph = Array.from(Array(4).keys()).map((i) => <Skeleton key={i} paragraph={{ rows: 4 }} active />);
    const shareButton = Array.from(Array(4).keys()).map((i) => (
        <Skeleton.Button key={i} size="large" active shape="circle" />
    ));

    return (
        <div className={styles.articleSkeleton}>
            <Skeleton.Button className={styles.articleSkeleton__image} active block />
            <Row>
                <Col xs={3} sm={2} lg={5} className="d-flex justify-content-end pe-4">
                    <Space direction="vertical" size={12} className="mt-4">
                        {shareButton}
                    </Space>
                </Col>
                <Col xs={21} sm={22} lg={12} className="mt-4">
                    {paragraph}
                </Col>
            </Row>
        </div>
    );
};

export default ViewArticleSkeleton;
