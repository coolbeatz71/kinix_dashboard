import React, { FC } from 'react';
import { Row, Col, Divider, Typography } from 'antd';
import { upperFirst } from 'lodash';

import styles from './index.module.scss';

const { Title, Text } = Typography;

export interface IOverviewGroupTitleProps {
    title: string;
    icon: JSX.Element;
    subTitle: string;
}

const OverviewGroupTitle: FC<IOverviewGroupTitleProps> = ({ title, icon, subTitle }) => {
    return (
        <Row justify="space-between" align="middle" className={styles.groupTitle}>
            <Col span={24} className="d-flex align-items-center title">
                {icon}
                <Title level={4}>{upperFirst(title)}</Title>
            </Col>
            <Divider />
            <Col span={24}>
                <Text ellipsis data-desc>
                    {subTitle}
                </Text>
            </Col>
        </Row>
    );
};

export default OverviewGroupTitle;
