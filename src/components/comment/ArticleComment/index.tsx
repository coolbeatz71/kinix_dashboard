import React, { FC, useState } from 'react';
import { Avatar, Button, Col, List, Row, Tooltip } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { IComment } from '@interfaces/api';
import UpdateArticleCommentModal from '@components/modal/UpdateArticleCommentModal';

export interface IArticleCommentProps {
    slug: string;
    comment: IComment;
    updatedTime: string;
    isCommentOwner: boolean;
}

const ArticleComment: FC<IArticleCommentProps> = ({ slug, comment, updatedTime, isCommentOwner }) => {
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

    return (
        <List.Item
            actions={
                isCommentOwner
                    ? [
                          <Tooltip key="edit" title="Modifier" placement="topRight">
                              <Button
                                  ghost
                                  size="small"
                                  type="primary"
                                  className="me-2"
                                  icon={<EditFilled />}
                                  onClick={() => setOpenUpdateModal(true)}
                              />
                          </Tooltip>,
                          <Tooltip title="Effacer" placement="topRight" key="delete">
                              <Button ghost danger size="small" type="primary" icon={<DeleteFilled />} />
                          </Tooltip>,
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
            <UpdateArticleCommentModal
                slug={slug}
                initialValues={comment}
                openModal={openUpdateModal}
                setOpenModal={setOpenUpdateModal}
            />
        </List.Item>
    );
};

export default ArticleComment;
