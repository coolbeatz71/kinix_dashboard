import { useParams } from 'react-router-dom';
import React, { Fragment, FC, useEffect, useCallback } from 'react';
import ArticleBody from '@components/article/ArticleBody';
import ArticleCover from '@components/article/ArticleCover';
import { isEmpty } from 'lodash';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import ServerError from '@components/common/ServerError';
import { useAppDispatch } from '@redux/store';
import getSingleArticleAction from '@redux/articles/single';
import { IUnknownObject } from '@interfaces/app';
import { IUser, IArticle } from '@interfaces/api';
import getRelatedArticlesAction from '@redux/articles/related';
import ViewArticleSkeleton from '@components/skeleton/ViewArticle';

const ViewArticle: FC = () => {
    const dispatch = useAppDispatch();
    const { slug } = useParams<IUnknownObject>();

    const {
        data: related,
        error: errRelated,
        loading: loadRelated,
    } = useSelector(({ articles: { related } }: IRootState) => related);
    const { data: user } = useSelector(({ users: { currentUser } }: IRootState) => currentUser);
    const { data: article, error, loading } = useSelector(({ articles: { single } }: IRootState) => single);

    const loadArticle = useCallback(() => {
        dispatch(getSingleArticleAction(slug));
    }, [dispatch, slug]);

    useEffect(() => {
        loadArticle();
    }, [loadArticle]);

    useEffect(() => {
        const { tags } = article;
        if (!isEmpty(tags)) dispatch(getRelatedArticlesAction({ slug, tags }));
    }, [article, dispatch, slug]);

    return (
        <Fragment>
            {error || errRelated ? (
                <ServerError onRefresh={() => loadArticle()} />
            ) : loading || loadRelated ? (
                <ViewArticleSkeleton />
            ) : (
                <Fragment>
                    <ArticleCover user={user as IUser} article={article as IArticle} />

                    <div className="mt-5">
                        <ArticleBody article={article as IArticle} related={related as IArticle[]} />
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ViewArticle;
