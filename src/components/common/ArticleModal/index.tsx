import React, { FC } from 'react';
import { Button, Modal, Space, Row, Typography, Col, Form } from 'antd';
import { SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import CreateArticleForm from '@components/form/CreateArticle';

const { useForm } = Form;
const { Title } = Typography;

export interface IArticleModalProps {
    visible: boolean;
    setVisible: (val: boolean) => void;
}

const ArticleModal: FC<IArticleModalProps> = ({ visible, setVisible }) => {
    const [form] = useForm();
    const onCloseModal = (): void => {
        setVisible(false);
    };

    const onCreateArticle = (): void => {
        form.validateFields();
        console.log(form.getFieldsValue());
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
                            <Button
                                ghost
                                type="primary"
                                htmlType="submit"
                                onClick={onCreateArticle}
                                icon={<SaveOutlined />}
                            >
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
            <CreateArticleForm formRef={form} onSubmit={onCreateArticle} />
        </Modal>
    );
};

export default ArticleModal;
