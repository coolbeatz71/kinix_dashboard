import React, { FC } from 'react';
import { IArticle, IUser } from '@interfaces/api';
import numeral from 'numeral';
import { Col, Row, Typography, Grid } from 'antd';
import CustomIcon from '../../common/CustomIcon';
import { HeartOutlined } from '@ant-design/icons';
import isMyLike from '@helpers/isMyLike';
import ArticleAction from '../ArticleAction';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

export interface IArticleCoverProps {
    user: IUser;
    article: IArticle;
}

const ArticleCover: FC<IArticleCoverProps> = ({ article, user }) => {
    const cover = article.images?.[0];
    const liked = isMyLike(article.like || [], user.id);
    const { lg } = useBreakpoint();

    return (
        <div className={styles.articleCover}>
            <div className={styles.articleCover__overlay}>
                <img src={cover} alt={article.title} />
            </div>
            <Row justify="space-between" align="middle" className={styles.articleCover__content}>
                {lg && (
                    <Col md={24} lg={3} className={styles.articleCover__content__like}>
                        {liked ? (
                            <CustomIcon type="liked-heart" data-is-my-like={liked} />
                        ) : (
                            <HeartOutlined data-is-my-like={liked} />
                        )}
                        <Text data-likes-value>{numeral(article.likesCount).format('0.[00]a')} likes</Text>
                        <Text data-read>{article.reads || 0} min read</Text>
                    </Col>
                )}
                <Col md={24} lg={21} className={styles.articleCover__content__title}>
                    <Title>{article.title}</Title>
                </Col>
                {!lg && (
                    <Row className={styles.articleCover__content__action}>
                        <Col span={16} className={styles.articleCover__content__action__left}>
                            <ArticleAction article={article} />
                        </Col>
                        <Col span={8} className={styles.articleCover__content__action__right}>
                            <Text data-read>{article.reads || 0} min read</Text>
                        </Col>
                    </Row>
                )}
            </Row>
        </div>
    );
};

export default ArticleCover;
