import React, { FC } from 'react';
import { Button, Col, Row } from 'antd';
import numeral from 'numeral';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

export interface IArticleActionProps {
    likesCount: number;
    commentsCount: number;
}

const ArticleAction: FC<IArticleActionProps> = ({ likesCount, commentsCount }) => {
    const likes = numeral(likesCount).format('0.[00]a');
    const comments = numeral(commentsCount).format('0.[00]a');

    return (
        <Row className={styles.articleAction}>
            <Col className="d-flex justify-content-end">
                <Button data-like type="link" icon={<HeartOutlined />}>
                    <span data-count>{likes}</span>
                </Button>
                <Button data-comment type="link" icon={<CommentOutlined />}>
                    <span data-count>{comments}</span>
                </Button>
            </Col>
        </Row>
    );
};

export default ArticleAction;
