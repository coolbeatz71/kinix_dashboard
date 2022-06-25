import React, { FC } from 'react';
import { Button, Modal, Space, Row, Typography, Col } from 'antd';
import { SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import CreateArticleForm from '@components/form/CreateArticle';

const { Title } = Typography;

export interface IArticleModalProps {
    visible: boolean;
    setVisible: (val: boolean) => void;
}

const ArticleModal: FC<IArticleModalProps> = ({ visible, setVisible }) => {
    const onCloseModal = (): void => {
        setVisible(false);
    };

    return (
        <Modal
            footer={null}
            width={720}
            closable={false}
            visible={visible}
            className={styles.articleModal}
            title={
                <Row justify="space-between" align="middle">
                    <Col flex={1}>
                        <Title level={4}>Créer Article</Title>
                    </Col>
                    <Col>
                        <Space>
                            <Button type="primary" ghost icon={<SaveOutlined />}>
                                Enregistrer
                            </Button>
                            <Button type="primary" danger icon={<CloseCircleOutlined />} onClick={onCloseModal}>
                                Annuler
                            </Button>
                        </Space>
                    </Col>
                </Row>
            }
        >
            <CreateArticleForm />
        </Modal>
    );
};

export default ArticleModal;
