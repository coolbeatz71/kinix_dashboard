import React, { FC } from 'react';
import dayjs from 'dayjs';
import { Breadcrumb, Col, Row } from 'antd';
import styles from './index.module.scss';

const { Item } = Breadcrumb;

export interface IArticleHeaderProps {
    author: string;
    updatedAt: string;
}

const ArticleHeader: FC<IArticleHeaderProps> = ({ author, updatedAt }) => {
    const updatedTime = dayjs(updatedAt).fromNow();
    return (
        <div className={styles.articleHeader}>
            <Row justify="space-between" align="middle">
                <Col span={24} className="d-flex justify-content-start">
                    <Breadcrumb>
                        <Item data-author>
                            <span className="text-dark">
                                Par <strong>{author}</strong>
                            </span>
                        </Item>
                        <Item>{updatedTime}</Item>
                    </Breadcrumb>
                </Col>
            </Row>
        </div>
    );
};

export default ArticleHeader;
