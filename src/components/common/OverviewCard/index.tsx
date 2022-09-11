import React, { FC, ReactNode } from 'react';
import numeral from 'numeral';
import { Card, Col, Row, Space, Tag, Typography } from 'antd';
import { upperFirst } from 'lodash';

const { Text } = Typography;

export interface IOverviewCardProps {
    title: string;
    total: number;
    icon: ReactNode;
    className: string;
    actions: {
        title: string;
        value: number;
        color: string;
    }[];
}

const OverviewCard: FC<IOverviewCardProps> = ({ title, total, icon, actions, className }) => {
    return (
        <Card
            bordered
            hoverable
            className="mb-4"
            actions={[
                actions.map((action) => (
                    <Space key={action.title}>
                        <Tag>{numeral(action.value).format('0.[00]a')}</Tag>
                        <Tag color={action.color}>{action.title}</Tag>
                    </Space>
                )),
            ]}
        >
            <Row align="middle" justify="space-between">
                <Col span={8}>{icon}</Col>
                <Col span={16} className={className}>
                    <Text strong data-title>
                        {upperFirst(title)}
                    </Text>
                    <br />
                    <Text data-value>{numeral(total).format('0.[00]a')}</Text>
                </Col>
            </Row>
        </Card>
    );
};

export default OverviewCard;
