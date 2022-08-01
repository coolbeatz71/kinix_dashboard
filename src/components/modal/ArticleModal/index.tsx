import React, { FC, useEffect, useState } from 'react';
import { Button, Modal, Space, Row, Typography, Col, Form } from 'antd';
import { useAppDispatch } from '@redux/store';
import { useSelector } from 'react-redux';
import { SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import CreateArticleForm from '@components/form/CreateArticle';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { IArticleData } from '@interfaces/articles';
import addArticleAction, { resetAddArticleAction } from '@redux/articles/add';
import { IRootState } from '@redux/reducers';
import FormSuccessResult from '../../common/FormSuccessResult';

import styles from './index.module.scss';

const { useForm } = Form;
const { Title } = Typography;

export interface IArticleModalProps {
    visible: boolean;
    reload?: () => void;
    initialValues?: IArticleData;
    formContext: EnumFormContext;
    setVisible: (val: boolean) => void;
}

const SUCCESS_CREATE = "L'article a été créé avec succès";
const SUCCESS_EDIT = 'Cet article a été modifié avec succès';

const ArticleModal: FC<IArticleModalProps> = ({
    visible,
    setVisible,
    formContext,
    initialValues,
    reload = () => {
        //
    },
}) => {
    const dispatch = useAppDispatch();
    const { error, loading } = useSelector(({ articles: { add } }: IRootState) => add);

    const [form] = useForm();
    const [success, setSuccess] = useState('');

    const onCloseModal = (): void => {
        setVisible(false);
    };

    const onSubmitArticle = (formData: IUnknownObject | IArticleData): void => {
        form.validateFields();
        const isEdit = formContext === EnumFormContext.EDIT;
        dispatch(
            addArticleAction({
                isEdit,
                data: formData as IArticleData,
            }),
        ).then((res) => {
            if (res.type === 'articles/add/rejected') window.scrollTo({ top: 0, behavior: 'smooth' });
            if (res.type === 'articles/add/fulfilled') {
                if (isEdit) reload();
                setSuccess(isEdit ? SUCCESS_EDIT : SUCCESS_CREATE);
            }
        });
    };

    useEffect(() => {
        setSuccess('');
        resetAddArticleAction()(dispatch);
    }, [dispatch]);

    return (
        <Modal
            centered
            width={720}
            footer={null}
            destroyOnClose
            closable={false}
            visible={visible}
            className={styles.articleModal}
            title={
                !success && (
                    <Row justify="space-between" align="middle">
                        <Col flex={1}>
                            <Title level={4} className="mb-0">
                                Créer Article
                            </Title>
                        </Col>
                        <Col>
                            <Space>
                                <Button
                                    ghost
                                    type="primary"
                                    loading={loading}
                                    disabled={loading}
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    onClick={() => form.submit()}
                                >
                                    Enregistrer
                                </Button>
                                <Button type="primary" danger icon={<CloseCircleOutlined />} onClick={onCloseModal}>
                                    Annuler
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                )
            }
        >
            {success ? (
                <FormSuccessResult title={success} onClose={onCloseModal} />
            ) : (
                <CreateArticleForm
                    error={error}
                    formRef={form}
                    formContext={formContext}
                    onSubmit={onSubmitArticle}
                    initialValues={initialValues}
                />
            )}
        </Modal>
    );
};

export default ArticleModal;
