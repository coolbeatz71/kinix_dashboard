import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { IGeneralOverview } from '@interfaces/overview';
import OverviewCard from '../../common/OverviewCard';
import { HiUsers } from 'react-icons/hi';
import { RiArticleLine } from 'react-icons/ri';
import { VideoCameraFilled, GlobalOutlined } from '@ant-design/icons';
import GeneralOverviewSkeleton from '@components/skeleton/GeneralOverview';
import { ADS_PATH, ARTICLE_PATH, USER_PATH, VIDEO_PATH } from '@constants/paths';

import styles from './index.module.scss';
import { Link } from 'react-router-dom';
export interface IGeneralOverviewProps {
    loading: boolean;
    overview: IGeneralOverview;
}

const GeneralOverview: FC<IGeneralOverviewProps> = ({ loading, overview }) => {
    const data = [
        {
            path: USER_PATH,
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
            path: VIDEO_PATH,
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
            path: ARTICLE_PATH,
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
            path: ADS_PATH,
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
            {loading
                ? Array.from(Array(4).keys()).map((i) => (
                      <Col xs={24} sm={24} md={12} lg={12} xl={6} key={i}>
                          <GeneralOverviewSkeleton />
                      </Col>
                  ))
                : data.map((item) => (
                      <Col xs={24} sm={24} md={12} lg={12} xl={6} key={item.title}>
                          <Link to={item.path}>
                              <OverviewCard
                                  icon={item.icon}
                                  title={item.title}
                                  total={item.total}
                                  actions={item.actions}
                                  className={styles.general__count}
                              />
                          </Link>
                      </Col>
                  ))}
        </Row>
    );
};

export default GeneralOverview;
