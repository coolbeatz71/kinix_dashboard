import React, { FC, useEffect, useState } from 'react';
import { IArticle, IUser } from '@interfaces/api';
import numeral from 'numeral';
import { Col, Row, Typography, Grid, message } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import isLikeOwner from '@helpers/isLikeOwner';
import addArticleLikeAction from '@redux/likes/add';
import removeArticleLikeAction from '@redux/likes/unlike';
import getArticleLikesAction from '@redux/likes/getAll';
import { useAppDispatch } from '@redux/store';
import ArticleAction from '../ArticleAction';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

export interface IArticleCoverProps {
    user: IUser;
    article: IArticle;
}

const ArticleCover: FC<IArticleCoverProps> = ({ article, user }) => {
    const { lg } = useBreakpoint();
    const dispatch = useAppDispatch();
    const cover = article.images?.[0];

    const [like, setLike] = useState(article.likesCount);
    const [likeOwner, setLikeOwner] = useState<boolean | undefined>(false);

    const likes = numeral(like).format('0.[00]a');

    const { data: allLikes } = useSelector(({ likes: { all } }: IRootState) => all);
    const { error: errLike } = useSelector(({ likes: { add } }: IRootState) => add);
    const { error: errUnlike } = useSelector(({ likes: { unlike } }: IRootState) => unlike);

    useEffect(() => {
        if (article.slug) dispatch(getArticleLikesAction(article.slug));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (allLikes?.rows) {
            setLike(allLikes?.count);
            setLikeOwner(isLikeOwner(user.id, allLikes.rows));
        }
    }, [allLikes, user.id]);

    const likeArticle = (): void => {
        dispatch(addArticleLikeAction(article.slug)).then((res) => {
            if (res.type === 'likes/add/rejected') message.error(errLike?.message);
            else if (res.type === 'likes/add/fulfilled') {
                setLike(Number(like) + 1);
                dispatch(getArticleLikesAction(article.slug));
                message.success('Like ajouté avec succès!');
            }
        });
    };

    const unlikeArticle = (): void => {
        dispatch(removeArticleLikeAction(article.slug)).then((res) => {
            if (res.type === 'likes/unlike/rejected') message.error(errUnlike?.message);
            else if (res.type === 'likes/unlike/fulfilled') {
                setLike(Number(like) - 1);
                dispatch(getArticleLikesAction(article.slug));
                message.success('Like supprimé avec succès!');
            }
        });
    };

    return (
        <div className={styles.articleCover}>
            <div className={styles.articleCover__overlay}>
                <img src={cover} alt={article.title} />
            </div>
            <Row justify="space-between" align="middle" className={styles.articleCover__content}>
                {lg && (
                    <Col md={24} lg={3} className={styles.articleCover__content__like}>
                        {likeOwner ? (
                            <HeartFilled data-is-my-like={likeOwner} onClick={() => unlikeArticle()} />
                        ) : (
                            <HeartOutlined data-is-my-like={likeOwner} onClick={() => likeArticle()} />
                        )}
                        <Text data-likes-value>
                            {likes} {Number(like) > 1 ? 'likes' : 'like'}
                        </Text>
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
