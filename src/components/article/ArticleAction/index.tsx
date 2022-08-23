import React, { FC, useState } from 'react';
import { Button, Col, Row } from 'antd';
import numeral from 'numeral';
import { IArticle } from '@interfaces/api';
import ArticleCommentsDrawer from '@components/comment/ArticleCommentsDrawer';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

export interface IArticleActionProps {
    article: IArticle;
}

const ArticleAction: FC<IArticleActionProps> = ({ article }) => {
    const [openCommentDrawer, setOpenCommentDrawer] = useState<boolean>(false);

    const likes = numeral(article?.likesCount).format('0.[00]a');
    const comments = numeral(article?.commentsCount).format('0.[00]a');

    return (
        <Row className={styles.articleAction}>
            <Col className="d-flex justify-content-end">
                <Button data-like type="link" icon={<HeartOutlined />}>
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
