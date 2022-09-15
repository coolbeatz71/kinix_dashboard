import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { IAdsOverview } from '@interfaces/promotion';
import EnumPromotionPlan from '@constants/promotion';
import AdsOverviewSkeleton from '@components/skeleton/AdsOverview';
import { LINK, PRIMARY, SUCCESS, WARNING } from '@constants/colors';
import PromotionOverviewCard from '@components/common/PromotionOverviewCard';
import { CrownOutlined, DashboardOutlined, DollarOutlined, MehOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

export interface IAdsOverviewProps {
    loading: boolean;
    overview: IAdsOverview;
}

const AdsOverview: FC<IAdsOverviewProps> = ({ loading, overview }) => {
    const data = [
        {
            color: WARNING,
            icon: <MehOutlined />,
            total: overview?.free?.total,
            title: EnumPromotionPlan.FREE,
            amount: overview?.free?.amount,
        },
        {
            color: SUCCESS,
            icon: <DashboardOutlined />,
            total: overview?.basic?.total,
            title: EnumPromotionPlan.BASIC,
            amount: overview?.basic?.amount,
        },
        {
            color: LINK,
            icon: <DollarOutlined />,
            total: overview?.professional?.total,
            title: EnumPromotionPlan.PROFESSIONAL,
            amount: overview?.professional?.amount,
        },
        {
            color: PRIMARY,
            icon: <CrownOutlined />,
            total: overview?.premium?.total,
            title: EnumPromotionPlan.PREMIUM,
            amount: overview?.premium?.amount,
        },
    ];

    return (
        <Row align="middle" justify="space-between" className={styles.overview} gutter={24}>
            {loading
                ? Array.from(Array(4).keys()).map((i) => (
                      <Col xs={24} sm={24} md={12} lg={12} xl={6} key={i}>
                          <AdsOverviewSkeleton />
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

export default AdsOverview;
