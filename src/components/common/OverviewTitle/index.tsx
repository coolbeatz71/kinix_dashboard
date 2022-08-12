import React, { FC } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { upperFirst } from 'lodash';

import styles from './index.module.scss';

const { Title } = Typography;

export interface IOverviewTitleProps {
    title: string;
    color: string;
    icon: JSX.Element;
    linkHasMore?: string;
}

const OverviewTitle: FC<IOverviewTitleProps> = ({ title, icon, color, linkHasMore }) => (
    <div className={styles.overviewTitle} style={{ background: color }}>
        <Row justify="space-between" align="middle">
            <Col flex={1} className="d-flex align-items-center" data-icon>
                {icon}
                <Title level={4}>{upperFirst(title)}</Title>
            </Col>
            {linkHasMore && (
                <Col flex={4} className="d-flex justify-content-end">
                    <Link to={linkHasMore}>
                        <Button ghost>Voir Plus</Button>
                    </Link>
                </Col>
            )}
        </Row>
    </div>
);

export default OverviewTitle;
