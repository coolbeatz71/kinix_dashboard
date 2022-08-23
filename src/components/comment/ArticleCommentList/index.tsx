import React, { FC } from 'react';
import dayjs from 'dayjs';
import { Avatar, Button, Col, List, Row, Space, Tooltip } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { IComment } from '@interfaces/api';
import { IRootState } from '@redux/reducers';

import styles from './index.module.scss';

export interface IArticleCommentListProps {
    data?: IComment[];
}

const ArticleCommentList: FC<IArticleCommentListProps> = ({ data }) => {
    const { data: user } = useSelector(({ users: { currentUser } }: IRootState) => currentUser);

    return (
        <List
            size="large"
            split={false}
            dataSource={data}
            itemLayout="vertical"
            className={styles.articleComment}
            renderItem={(comment) => {
                const updatedTime = dayjs(comment.updatedAt).fromNow();
                const isCommentOwner = user.email === comment.user?.email;

                return (
                    <List.Item
                        key={comment.id}
                        actions={
                            isCommentOwner
                                ? [
                                      <Space key="action">
                                          <Tooltip title="Modifier" placement="topRight">
                                              <Button icon={<EditFilled />} ghost type="primary" size="small" />
                                          </Tooltip>
                                          <Tooltip title="Effacer" placement="topRight">
                                              <Button
                                                  icon={<DeleteFilled />}
                                                  ghost
                                                  danger
                                                  size="small"
                                                  type="primary"
                                              />
                                          </Tooltip>
                                      </Space>,
                                  ]
                                : undefined
                        }
                    >
                        <List.Item.Meta
                            title={
                                <Row justify="space-between" align="middle">
                                    <Col>{comment.user?.userName}</Col>
                                    <Col data-updatetime>{updatedTime}</Col>
                                </Row>
                            }
                            avatar={<Avatar size="small" alt={comment.user?.userName} src={comment.user?.image} />}
                        />
                        {comment.body}
                    </List.Item>
                );
            }}
        />
    );
};

export default ArticleCommentList;
