import React, { FC, useEffect, useState } from 'react';
import { Button, Col, message, Row } from 'antd';
import numeral from 'numeral';
import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@redux/store';
import { IRootState } from '@redux/reducers';
import { IArticle } from '@interfaces/api';
import ArticleCommentsDrawer from '@components/comment/ArticleCommentsDrawer';
import getArticleLikesAction from '@redux/likes/getAll';
import addArticleLikeAction from '@redux/likes/add';
import removeArticleLikeAction from '@redux/likes/unlike';
import isLikeOwner from '@helpers/isLikeOwner';

import styles from './index.module.scss';

export interface IArticleActionProps {
    article: IArticle;
}

const ArticleAction: FC<IArticleActionProps> = ({ article }) => {
    const dispatch = useAppDispatch();

    const [like, setLike] = useState(article.likesCount);
    const [likeOwner, setLikeOwner] = useState<boolean | undefined>(false);

    const [openCommentDrawer, setOpenCommentDrawer] = useState<boolean>(false);

    const { data: allLikes } = useSelector(({ likes: { all } }: IRootState) => all);
    const { error: errLike } = useSelector(({ likes: { add } }: IRootState) => add);
    const { error: errUnlike } = useSelector(({ likes: { unlike } }: IRootState) => unlike);
    const { data: user } = useSelector(({ users: { currentUser } }: IRootState) => currentUser);

    const likes = numeral(like).format('0.[00]a');
    const comments = numeral(article.commentsCount).format('0.[00]a');

    useEffect(() => {
        if (article.slug) dispatch(getArticleLikesAction(article.slug));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (allLikes?.rows) {
            setLike(allLikes?.count);
            if (allLikes?.rows) setLikeOwner(isLikeOwner(user.id, allLikes.rows));
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
        <Row className={styles.articleAction}>
            <Col className="d-flex justify-content-end">
                <Button
                    data-like
                    type="link"
                    onClick={likeOwner ? unlikeArticle : likeArticle}
                    icon={likeOwner ? <HeartFilled data-liked /> : <HeartOutlined />}
                >
                    <span data-count>{likes}</span>
                </Button>
                <Button data-comment type="link" icon={<CommentOutlined />} onClick={() => setOpenCommentDrawer(true)}>
                    <span data-count>{comments}</span>
                </Button>
            </Col>
            <ArticleCommentsDrawer
                article={article}
                openDrawer={openCommentDrawer}
                setOpenDrawer={setOpenCommentDrawer}
            />
        </Row>
    );
};

export default ArticleAction;
