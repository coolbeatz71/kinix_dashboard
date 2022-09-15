import React, { FC, ReactNode } from 'react';
import numeral from 'numeral';
import { upperFirst } from 'lodash';
import { Card, Col, Row, Typography } from 'antd';

const { Text } = Typography;

export interface IPromotionOverviewCardProps {
    title: string;
    total: number;
    amount: number;
    color: string;
    icon: ReactNode;
    className: string;
}

const PromotionOverviewCard: FC<IPromotionOverviewCardProps> = ({ title, total, icon, amount, className, color }) => (
    <Card
        bordered={false}
        className="mb-4"
        style={{ background: color }}
        actions={[
            <div key="action" className="d-flex justify-content-between">
                <span>Revenu annuel ($ USD): </span>
                <span>
                    <strong>{numeral(amount).format('0,0')}</strong>
                </span>
            </div>,
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

export default PromotionOverviewCard;
