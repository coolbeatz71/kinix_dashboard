import React, { FC } from 'react';
import { Card, Col, Row, Skeleton } from 'antd';
import {
    AppstoreOutlined,
    CheckCircleOutlined,
    ShareAltOutlined,
    StarOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { IVideoOverview } from '@interfaces/overview';
import { ERROR, GRAY, LINK, PRIMARY, WARNING, YELLOW } from '@constants/colors';
import OverviewGroupTitle from '@components/common/OverviewGroupTitle';
import ShapePieChart from '@components/charts/ShapePieChart';
import AppBarChart from '@components/charts/BarChart';
import OverviewTitle from '@components/common/OverviewTitle';
import { VIDEO_PATH } from '@constants/paths';

import styles from './index.module.scss';

export interface IVideoOverviewProps {
    loading: boolean;
    overview: IVideoOverview;
}

const VideoOverview: FC<IVideoOverviewProps> = ({ loading, overview }) => {
    const groups = [
        {
            title: 'Accessibilité',
            icon: <CheckCircleOutlined />,
            subTitle: `Aperçu des videos basés sur leur accessibilité (actif/inactif)`,
            data: [
                {
                    color: WARNING,
                    name: 'Actif',
                    value: overview?.activity.active,
                },
                {
                    color: GRAY,
                    name: 'Inactif',
                    value: overview?.activity.inactive,
                },
            ],
        },
        {
            title: 'Categorie',
            icon: <AppstoreOutlined />,
            subTitle: `Aperçu du total des videos par categorie`,
            data: [
                {
                    color: ERROR,
                    name: 'Clip videos',
                    value: overview?.category.musicVideos,
                },
                {
                    color: PRIMARY,
                    name: 'Podcasts',
                    value: overview?.category.podcasts,
                },
                {
                    color: LINK,
                    name: 'Interviews',
                    value: overview?.category.interviews,
                },
                {
                    color: WARNING,
                    name: 'Flex&Beatz',
                    value: overview?.category.flexBeatz,
                },
                {
                    color: YELLOW,
                    name: 'LeFocus',
                    value: overview?.category.lefocus,
                },
            ],
        },
    ];

    const tops = [
        {
            color: PRIMARY,
            title: 'Top 5: Partages',
            icon: <ShareAltOutlined />,
            subTitle: `Aperçu du top 5 des videos ayant le plus de partages`,
            data: overview?.top.shares.map((dt, idx) => ({
                desc: dt.title,
                name: `${idx + 1}`,
                uv: Number(dt.sharesCount),
            })),
        },
        {
            color: YELLOW,
            icon: <StarOutlined />,
            title: 'Top 5: Avis',
            subTitle: `Aperçu du top 5 des videos ayant le plus d'etoiles d'avis`,
            data: overview?.top.rates.map((dt, idx) => ({
                desc: dt.title,
                name: `${idx + 1}`,
                uv: Number(dt.avgRate),
            })),
        },
    ];

    return (
        <div className="mb-4 d-inline-block w-100">
            <OverviewTitle color={WARNING} title="videos" icon={<VideoCameraOutlined />} linkHasMore={VIDEO_PATH} />
            <Row align="middle" justify="space-between" gutter={32}>
                {groups.map((group) => (
                    <Col xs={24} sm={24} md={12} key={group.title}>
                        <Card bordered hoverable className={styles.videos}>
                            <OverviewGroupTitle title={group.title} subTitle={group.subTitle} icon={group.icon} />
                            <Card bordered className={styles.videos__container}>
                                {loading ? (
                                    <Skeleton.Button active size="large" block />
                                ) : (
                                    <ShapePieChart data={group.data} />
                                )}
                            </Card>
                        </Card>
                    </Col>
                ))}
            </Row>
            {tops.map((top) => (
                <Row key={top.title} align="middle" justify="space-between">
                    <Col span={24}>
                        <Card bordered hoverable className={styles.videos}>
                            <OverviewGroupTitle title={top.title} subTitle={top.subTitle} icon={top.icon} />
                            <Card bordered className={styles.videos__container}>
                                {loading ? (
                                    <Skeleton.Button active size="large" block />
                                ) : (
                                    <AppBarChart single data={top.data} uvColor={top.color} />
                                )}
                            </Card>
                        </Card>
                    </Col>
                </Row>
            ))}
        </div>
    );
};

export default VideoOverview;
