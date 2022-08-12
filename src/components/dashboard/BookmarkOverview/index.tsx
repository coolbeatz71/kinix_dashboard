import React, { FC } from 'react';
import { IBookmarkOverview } from '@interfaces/overview';
import OverviewTitle from '@components/common/OverviewTitle';
import { ERROR, LINK, SUCCESS } from '@constants/colors';
import { RiBookmark3Line } from 'react-icons/ri';
import { PieChartOutlined } from '@ant-design/icons';
import { Card, Col, Row, Skeleton } from 'antd';
import OverviewGroupTitle from '@components/common/OverviewGroupTitle';
import ShapePieChart from '@components/charts/ShapePieChart';
import AppBarChart from '@components/charts/BarChart';

import styles from './index.module.scss';

export interface IBookmarkOverviewProps {
    loading: boolean;
    overview: IBookmarkOverview;
}

const BookmarkOverview: FC<IBookmarkOverviewProps> = ({ loading, overview }) => {
    const group = {
        title: 'Utilisateurs - Articles',
        icon: <PieChartOutlined />,
        subTitle: "Aperçu du total d'utilisateurs et d'articles dans les favoris.",
        data: [
            {
                color: LINK,
                name: 'Utilisateurs',
                value: overview?.users,
            },
            {
                color: SUCCESS,
                name: 'Articles',
                value: overview?.articles,
            },
        ],
    };

    const top = {
        color: ERROR,
        icon: <RiBookmark3Line />,
        title: "Top 5: d'articles en favoris",
        subTitle: `Aperçu du top 5 des articles dans le plus de favori`,
        data: overview?.top.bookmarked.map((dt, idx) => ({
            desc: dt.title,
            name: `${idx + 1}`,
            uv: Number(dt.bookmarksCount),
        })),
    };

    return (
        <div className="mb-4 d-inline-block w-100">
            <OverviewTitle color={ERROR} title="bookmarks" icon={<RiBookmark3Line />} />
            <Row align="middle" justify="space-between" gutter={32}>
                <Col xs={24} sm={24} md={12} key={group.title}>
                    <Card bordered hoverable className={styles.bookmarks}>
                        <OverviewGroupTitle title={group.title} subTitle={group.subTitle} icon={group.icon} />
                        <Card bordered className={styles.bookmarks__container}>
                            {loading ? (
                                <Skeleton.Button active size="large" block />
                            ) : (
                                <ShapePieChart data={group.data} />
                            )}
                        </Card>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} key={top.title}>
                    <Card bordered hoverable className={styles.bookmarks}>
                        <OverviewGroupTitle title={top.title} subTitle={top.subTitle} icon={top.icon} />
                        <Card bordered className={styles.bookmarks__container}>
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

export default BookmarkOverview;
