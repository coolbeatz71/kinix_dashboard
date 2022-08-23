import React, { FC, useCallback, useEffect } from 'react';
import numeral from 'numeral';
import { Col, Drawer, Form, notification, Row } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { EnumFormContext } from '@interfaces/app';
import { IArticle } from '@interfaces/api';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import { ICommentData } from '@interfaces/comments';
import addArticleCommentAction from '@redux/comments/add';
import ErrorAlert from '@components/common/ErrorAlert';
import ArticleCommentListSkeleton from '@components/skeleton/ArticleCommentList';
import CreateArticleComment from '@components/form/CreateArticleComment';
import getAllArticleCommentsAction from '@redux/comments/getAll';
import { useAppDispatch } from '@redux/store';
import ArticleCommentList from '../ArticleCommentList';

import styles from './index.module.scss';

const { useForm } = Form;

export interface IArticleCommentsDrawerProps {
    article: IArticle;
    openDrawer: boolean;
    setOpenDrawer: (v: boolean) => void;
}

const ArticleCommentsDrawer: FC<IArticleCommentsDrawerProps> = ({ article, openDrawer, setOpenDrawer }) => {
    const [form] = useForm();
    const dispatch = useAppDispatch();
    const { error, loading, data: comments } = useSelector(({ comments: { all } }: IRootState) => all);
    const { error: errAddComment, loading: loadAddComment } = useSelector(({ comments: { add } }: IRootState) => add);

    const onCloseDrawer = (): void => {
        setOpenDrawer(false);
    };

    const reloadArticleComments = useCallback(() => {
        dispatch(getAllArticleCommentsAction({ slug: article.slug }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (openDrawer) reloadArticleComments();
    }, [openDrawer, reloadArticleComments]);

    const onSubmitComment = (formData: ICommentData): void => {
        const { body } = formData;

        dispatch(addArticleCommentAction({ isEdit: false, data: { slug: article.slug, body } })).then((res) => {
            if (res.type === 'comments/add/fulfilled') {
                form.resetFields();
                reloadArticleComments();
                notification.success({
                    maxCount: 1,
                    key: 'success',
                    message: 'Youpi!',
                    placement: 'topRight',
                    description: 'Commentaire ajouté avec succès',
                });
            }
        });
    };

    return (
        <Drawer
            width={520}
            placement="right"
            visible={openDrawer}
            onClose={onCloseDrawer}
            title={
                <Row justify="space-between" align="middle">
                    <Col>Commentaires Article</Col>
                    <Col data-total>{comments?.count > 0 && numeral(comments?.count).format('0,0')}</Col>
                </Row>
            }
            closeIcon={<CloseCircleOutlined />}
            className={styles.articleCommentDrawer}
            footer={
                <div className="m-4">
                    <CreateArticleComment
                        formRef={form}
                        error={errAddComment}
                        loading={loadAddComment}
                        onSubmit={onSubmitComment}
                        formContext={EnumFormContext.CREATE}
                    />
                </div>
            }
        >
            {error ? (
                <ErrorAlert error={error} closable banner showIcon />
            ) : loading ? (
                <ArticleCommentListSkeleton />
            ) : (
                <ArticleCommentList data={comments.rows} />
            )}
        </Drawer>
    );
};

export default ArticleCommentsDrawer;
