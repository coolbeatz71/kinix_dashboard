import React, { FC } from 'react';
import { Card, Col, Row, Skeleton } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';
import { RiPlayList2Fill } from 'react-icons/ri';
import { IPlaylistOverview } from '@interfaces/overview';
import OverviewTitle from '@components/common/OverviewTitle';
import { LINK, WARNING } from '@constants/colors';
import OverviewGroupTitle from '@components/common/OverviewGroupTitle';
import ShapePieChart from '@components/charts/ShapePieChart';
import AppBarChart from '@components/charts/BarChart';

import styles from './index.module.scss';

export interface IPlaylistOverviewProps {
    loading: boolean;
    overview: IPlaylistOverview;
}

const PlaylistOverview: FC<IPlaylistOverviewProps> = ({ loading, overview }) => {
    const group = {
        title: 'Utilisateurs - Videos',
        icon: <PieChartOutlined />,
        subTitle: "Aperçu du total d'utilisateurs et de videos dans les playlists.",
        data: [
            {
                color: LINK,
                name: 'Utilisateurs',
                value: overview?.users,
            },
            {
                color: WARNING,
                name: 'Videos',
                value: overview?.videos,
            },
        ],
    };

    const top = {
        color: WARNING,
        icon: <RiPlayList2Fill />,
        title: 'Top 5: de videos en playlists',
        subTitle: `Aperçu du top 5 des videos dans le plus de playlists.`,
        data: overview?.top.playlisted.map((dt, idx) => ({
            desc: dt.title,
            name: `${idx + 1}`,
            uv: Number(dt.playlistsCount),
        })),
    };

    return (
        <div className="mb-4 d-inline-block w-100">
            <OverviewTitle color={WARNING} title="playlists" icon={<RiPlayList2Fill />} />
            <Row align="middle" justify="space-between" gutter={32}>
                <Col xs={24} sm={24} md={12} key={group.title}>
                    <Card bordered hoverable className={styles.playlists}>
                        <OverviewGroupTitle title={group.title} subTitle={group.subTitle} icon={group.icon} />
                        <Card bordered className={styles.playlists__container}>
                            {loading ? (
                                <Skeleton.Button active size="large" block />
                            ) : (
                                <ShapePieChart data={group.data} />
                            )}
                        </Card>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} key={top.title}>
                    <Card bordered hoverable className={styles.playlists}>
                        <OverviewGroupTitle title={top.title} subTitle={top.subTitle} icon={top.icon} />
                        <Card bordered className={styles.playlists__container}>
                            {loading ? (
                                <Skeleton.Button active size="large" block />
                            ) : (
                                <AppBarChart single data={top.data} uvColor={top.color} />
                            )}
                        </Card>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PlaylistOverview;
