import React, { FC } from 'react';
import { Col, Row } from 'antd';

import ErrorAlert from '@components/common/ErrorAlert';
import { IUnknownObject } from '@interfaces/app';
import { IGeneralOverview } from '@interfaces/overview';
import OverviewCard from '../OverviewCard';
import { HiUsers } from 'react-icons/hi';
import { RiArticleLine } from 'react-icons/ri';
import { VideoCameraFilled, GlobalOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import GeneralOverviewSkeleton from '@components/skeleton/GeneralOverview';

export interface IGeneralOverviewProps {
    loading: boolean;
    overview: IGeneralOverview;
    reload: () => void;
    error: Error | IUnknownObject | null;
}

const GeneralOverview: FC<IGeneralOverviewProps> = ({ loading, error, overview, reload }) => {
    const data = [
        {
            title: 'utilisateurs',
            total: overview?.users.all,
            icon: <HiUsers data-icon="utilisateurs" />,
            actions: [
                { title: 'confirmé', value: overview?.users.verified, color: 'green' },
                {
                    title: 'non-confirmé',
                    value: overview?.users.unverified,
                    color: 'volcano',
                },
            ],
        },
        {
            title: 'videos',
            total: overview?.videos.all,
            icon: <VideoCameraFilled data-icon="videos" />,
            actions: [
                { title: 'partagé', value: overview?.videos.shared, color: 'cyan' },
                {
                    title: 'évalué',
                    value: overview?.videos.rated,
                    color: 'purple',
                },
            ],
        },
        {
            title: 'articles',
            total: overview?.articles.all,
            icon: <RiArticleLine data-icon="articles" />,
            actions: [
                { title: 'liké', value: overview?.articles.liked, color: 'cyan' },
                {
                    title: 'commenté',
                    value: overview?.articles.commented,
                    color: 'purple',
                },
            ],
        },
        {
            title: 'promotions',
            total: overview?.promotions.all,
            icon: <GlobalOutlined data-icon="promotions" />,
            actions: [
                { title: 'actif', value: overview?.promotions.active, color: 'green' },
                {
                    title: 'inactif',
                    value: overview?.promotions.inactive,
                    color: 'volcano',
                },
            ],
        },
    ];
    return (
        <Row align="middle" justify="space-between" className={styles.general} gutter={24}>
            {loading ? (
                Array.from(Array(4).keys()).map((i) => (
                    <Col xs={24} sm={24} md={12} lg={12} xl={6} key={i}>
                        <GeneralOverviewSkeleton />
                    </Col>
                ))
            ) : error ? (
                <Col span={24}>
                    <ErrorAlert error={error} showIcon closable banner onClose={reload} />
                </Col>
            ) : (
                data.map((item) => (
                    <Col xs={24} sm={24} md={12} lg={12} xl={6} key={item.title}>
                        <OverviewCard
                            icon={item.icon}
                            title={item.title}
                            total={item.total}
                            actions={item.actions}
                            className={styles.general__count}
                        />
                    </Col>
                ))
            )}
        </Row>
    );
};

export default GeneralOverview;
