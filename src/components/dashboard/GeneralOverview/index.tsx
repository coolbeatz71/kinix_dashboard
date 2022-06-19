import React, { FC, Fragment } from 'react';
import { Col, Row } from 'antd';

import ErrorAlert from '@components/common/ErrorAlert';
import { IUnknownObject } from '@interfaces/app';
import { IGeneralOverview } from '@interfaces/overview';
import OverviewCard from '../Card';
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
    return (
        <Row align="middle" justify="space-between" className={styles.general} gutter={24}>
            {loading ? (
                Array.from(Array(4)).map((i) => (
                    <Col xs={24} sm={12} md={6} lg={6} key={i}>
                        <GeneralOverviewSkeleton />
                    </Col>
                ))
            ) : error ? (
                <Col span={24}>
                    <ErrorAlert error={error} showIcon closable banner onClose={reload} />
                </Col>
            ) : (
                <Fragment>
                    <Col xs={24} sm={12} md={6} lg={6}>
                        <OverviewCard
                            title="utilisateurs"
                            total={overview?.users.all}
                            icon={<HiUsers data-icon="utilisateurs" />}
                            className={styles.general__count}
                            actions={[
                                { title: 'confirmé', value: overview?.users.verified, color: 'green' },
                                {
                                    title: 'non-confirmé',
                                    value: overview?.users.unverified,
                                    color: 'volcano',
                                },
                            ]}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                        <OverviewCard
                            title="videos"
                            total={overview?.videos.all}
                            icon={<VideoCameraFilled data-icon="videos" />}
                            className={styles.general__count}
                            actions={[
                                { title: 'partagé', value: overview?.videos.shared, color: 'cyan' },
                                {
                                    title: 'évalué',
                                    value: overview?.videos.rated,
                                    color: 'purple',
                                },
                            ]}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                        <OverviewCard
                            title="articles"
                            total={overview?.articles.all}
                            icon={<RiArticleLine data-icon="articles" />}
                            className={styles.general__count}
                            actions={[
                                { title: 'liké', value: overview?.articles.liked, color: 'cyan' },
                                {
                                    title: 'commenté',
                                    value: overview?.articles.commented,
                                    color: 'purple',
                                },
                            ]}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                        <OverviewCard
                            title="promotions"
                            total={overview?.promotions.all}
                            icon={<GlobalOutlined data-icon="promotions" />}
                            className={styles.general__count}
                            actions={[
                                { title: 'actif', value: overview?.promotions.active, color: 'green' },
                                {
                                    title: 'inactif',
                                    value: overview?.promotions.inactive,
                                    color: 'volcano',
                                },
                            ]}
                        />
                    </Col>
                </Fragment>
            )}
        </Row>
    );
};

export default GeneralOverview;
