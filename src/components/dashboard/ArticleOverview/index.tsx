import React, { FC, Fragment } from 'react';
import { Card, Col, Row, Skeleton } from 'antd';
import { CheckCircleOutlined, CommentOutlined, HeartOutlined } from '@ant-design/icons';
import { IArticleOverview } from '@interfaces/overview';
import { ERROR, GRAY, LINK, SUCCESS } from '@constants/colors';
import OverviewGroupTitle from '@components/common/OverviewGroupTitle';
import ShapePieChart from '@components/charts/ShapePieChart';
import AppBarChart from '@components/charts/BarChart';

import styles from './index.module.scss';

export interface IArticleOverviewProps {
    loading: boolean;
    overview: IArticleOverview;
}

const ArticleOverview: FC<IArticleOverviewProps> = ({ loading, overview }) => {
    const groups = [
        {
            title: 'Accessibilité',
            icon: <CheckCircleOutlined />,
            subTitle: `Aperçu des articles basés sur leur accessibilité (actif/inactif)`,
            data: [
                {
                    color: SUCCESS,
                    name: 'Actif',
                    value: overview?.activity.active,
                },
                {
                    color: ERROR,
                    name: 'Inactif',
                    value: overview?.activity.inactive,
                },
            ],
        },
        {
            title: 'Likes',
            icon: <HeartOutlined />,
            subTitle: `Aperçu du total d'articles liké(s) et non-liké(s)`,
            data: [
                {
                    color: ERROR,
                    name: 'Liké',
                    value: overview?.likes.liked,
                },
                {
                    color: GRAY,
                    name: 'Non-liké',
                    value: overview?.likes.nonLiked,
                },
            ],
        },
    ];

    const tops = [
        {
            color: ERROR,
            title: 'Top 5: Likes',
            icon: <HeartOutlined />,
            subTitle: `Aperçu des articles basés sur leur accessibilité (actif/inactif)`,
            data: overview?.top.likes.map((dt, idx) => ({
                desc: dt.title,
                name: `${idx + 1}`,
                uv: Number(dt.likesCount),
            })),
        },
        {
            color: LINK,
            icon: <CommentOutlined />,
            title: 'Top 5: Commentaires',
            subTitle: `Aperçu du top 5 des articles les plus commentés`,
            data: overview?.top.comments.map((dt, idx) => ({
                desc: dt.title,
                name: `${idx + 1}`,
                uv: Number(dt.commentsCount),
            })),
        },
    ];

    return (
        <Fragment>
            <Row align="middle" justify="space-between" gutter={32}>
                {groups.map((group) => (
                    <Col xs={24} sm={24} md={12} key={group.title}>
                        <Card bordered hoverable className={styles.articles}>
                            <OverviewGroupTitle title={group.title} subTitle={group.subTitle} icon={group.icon} />
                            <Card bordered className={styles.articles__container}>
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
                        <Card bordered hoverable className={styles.articles}>
                            <OverviewGroupTitle title={top.title} subTitle={top.subTitle} icon={top.icon} />
                            <Card bordered className={styles.articles__container}>
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
        </Fragment>
    );
};

export default ArticleOverview;
