import { useParams } from 'react-router-dom';
import React, { Fragment, FC, useEffect, useCallback } from 'react';
import ArticleBody from '@components/article/ArticleBody';
import ArticleCover from '@components/article/ArticleCover';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import ServerError from '@components/common/ServerError';
import { useAppDispatch } from '@redux/store';
import getSingleArticleAction from '@redux/articles/single';
import { IUnknownObject } from '@interfaces/app';
import { IUser, IArticle } from '@interfaces/api';

const SingleArticle: FC = () => {
    const { slug } = useParams<IUnknownObject>();
    const dispatch = useAppDispatch();

    const { data: user } = useSelector(({ users: { currentUser } }: IRootState) => currentUser);
    const { data: article, error } = useSelector(({ articles: { single } }: IRootState) => single);

    const loadArticle = useCallback(() => {
        dispatch(getSingleArticleAction(slug));
    }, [dispatch, slug]);

    useEffect(() => {
        loadArticle();
    }, [loadArticle]);

    return (
        <Fragment>
            {error ? (
                <ServerError onRefresh={() => loadArticle()} />
            ) : (
                <Fragment>
                    <ArticleCover user={user as IUser} article={article as IArticle} />

                    <div className="mt-5">
                        <ArticleBody article={article as IArticle} />
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default SingleArticle;
