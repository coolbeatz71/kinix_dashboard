import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { IPromotionOverview } from '@interfaces/promotion';
import EnumPromotionPlan from '@constants/promotion';
import PromotionOverviewSkeleton from '@components/skeleton/PromotionOverview';
import { promotionPlanColors } from '@constants/colors';
import PromotionOverviewCard from '@components/common/PromotionOverviewCard';
import { CrownOutlined, DashboardOutlined, DollarOutlined, MehOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

export interface IPromotionOverviewProps {
    loading: boolean;
    overview: IPromotionOverview;
}

const PromotionOverview: FC<IPromotionOverviewProps> = ({ loading, overview }) => {
    const data = [
        {
            icon: <MehOutlined />,
            total: overview?.free?.total,
            title: EnumPromotionPlan.FREE,
            amount: overview?.free?.amount,
            color: promotionPlanColors.FREE,
        },
        {
            icon: <DashboardOutlined />,
            total: overview?.basic?.total,
            title: EnumPromotionPlan.BASIC,
            amount: overview?.basic?.amount,
            color: promotionPlanColors.BASIC,
        },
        {
            icon: <DollarOutlined />,
            total: overview?.professional?.total,
            title: EnumPromotionPlan.PROFESSIONAL,
            amount: overview?.professional?.amount,
            color: promotionPlanColors.PROFESSIONAL,
        },
        {
            icon: <CrownOutlined />,
            total: overview?.premium?.total,
            title: EnumPromotionPlan.PREMIUM,
            amount: overview?.premium?.amount,
            color: promotionPlanColors.PREMIUM,
        },
    ];

    return (
        <Row align="middle" justify="space-between" className={styles.overview} gutter={24}>
            {loading
                ? Array.from(Array(4).keys()).map((i) => (
                      <Col xs={24} sm={24} md={12} lg={12} xl={6} key={i}>
                          <PromotionOverviewSkeleton />
                      </Col>
                  ))
                : data.map((item) => (
                      <Col xs={24} sm={24} md={12} lg={12} xl={6} key={item.title}>
                          <PromotionOverviewCard
                              icon={item.icon}
                              title={item.title}
                              total={item.total}
                              color={item.color}
                              amount={item.amount}
                              className={styles.overview__count}
                          />
                      </Col>
                  ))}
        </Row>
    );
};

export default PromotionOverview;
