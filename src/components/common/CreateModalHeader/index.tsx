import React, { FC } from 'react';
import { SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Space, Button, Row, Col, Typography } from 'antd';
import format from '@helpers/formatString';

const { Title } = Typography;

export interface ICreateModalHeaderProps {
    isEdit: boolean;
    loading: boolean;
    onSubmit: () => void;
    onCloseModal: () => void;
    context: 'article' | 'video';
}

const CreateModalHeader: FC<ICreateModalHeaderProps> = ({ loading, onCloseModal, onSubmit, context, isEdit }) => {
    const title = format(context, 'upper-lowercase');

    return (
        <Row justify="space-between" align="middle">
            <Col flex={1}>
                <Title level={4}>
                    {isEdit ? 'Modifier' : 'Créer'} {title}
                </Title>
            </Col>
            <Col>
                <Space>
                    <Button
                        ghost
                        type="primary"
                        loading={loading}
                        htmlType="submit"
                        disabled={loading}
                        onClick={onSubmit}
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
    );
};

export default CreateModalHeader;
