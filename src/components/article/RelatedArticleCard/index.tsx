import React, { FC } from 'react';
import dayjs from 'dayjs';
import { truncate } from 'lodash';
import { Card, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ClockCircleOutlined } from '@ant-design/icons';
import { IArticle } from '@interfaces/api';
import { ARTICLE_PATH } from '@constants/paths';

import styles from './index.module.scss';

const { Title, Text } = Typography;

export interface IRelatedArticleProps {
    article: IArticle;
}

const RelatedArticleCard: FC<IRelatedArticleProps> = ({ article }) => {
    const cover = article.images?.[0];
    const createdTime = dayjs(article?.createdAt).fromNow();

    return (
        <Card size="default" bordered className={styles.relatedArticleCard}>
            <Link to={`${ARTICLE_PATH}/${article.slug}`}>
                <Row justify="space-between">
                    <Col span={8} className={styles.relatedArticleCard__cover}>
                        <img src={cover} alt={article.slug} />
                    </Col>
                    <Col span={16} data-body>
                        <div className={styles.relatedArticleCard__header}>
                            <div className="d-flex justify-content-between">
                                <Text data-text="header">
                                    {truncate(`By ${article.user?.userName}`, {
                                        length: 90,
                                    })}
                                </Text>
                                <Text data-text="header" className="d-flex align-items-center">
                                    <ClockCircleOutlined />
                                    &nbsp; {createdTime}
                                </Text>
                            </div>
                        </div>
                        <div className={styles.relatedArticleCard__content}>
                            <Title level={5} data-text="title">
                                {truncate(article.title, {
                                    length: 100,
                                })}
                            </Title>
                        </div>
                    </Col>
                </Row>
            </Link>
        </Card>
    );
};

export default RelatedArticleCard;
