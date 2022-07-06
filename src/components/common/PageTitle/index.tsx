import React, { FC, ReactElement } from 'react';
import { Col, Row, Typography } from 'antd';
import styles from './index.module.scss';

const { Title } = Typography;

export interface IPageTitleProps {
    title: string;
    children: ReactElement;
}

const PageTitle: FC<IPageTitleProps> = ({ title, children }) => {
    return (
        <div className={styles.pageTitle}>
            <Row justify="space-between" align="middle">
                <Col flex={1} className="d-flex align-items-center">
                    <Title level={3}>{title}</Title>
                </Col>
                <Col>{children}</Col>
            </Row>
        </div>
    );
};

export default PageTitle;
