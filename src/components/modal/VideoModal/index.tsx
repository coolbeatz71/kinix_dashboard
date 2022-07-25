import React, { FC, useEffect, useState } from 'react';
import { Button, Modal, Space, Row, Typography, Col, Form } from 'antd';
import { useAppDispatch } from '@redux/store';
import { useSelector } from 'react-redux';
import { SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { IRootState } from '@redux/reducers';
import FormSuccessResult from '@components/common/FormSuccessResult';
import { IVideoData } from '@interfaces/videos';
import addVideoAction, { resetAddVideoAction } from '@redux/videos/add';
import CreateVideoForm from '@components/form/CreateVideo';
import getVideoCategoriesAction from '@redux/videos/getCategories';
import { ICategory, IUser } from '@interfaces/api';

import styles from './index.module.scss';

const { useForm } = Form;
const { Title } = Typography;

export interface IVideoModalProps {
    visible: boolean;
    initialValues?: IVideoData;
    formContext: EnumFormContext;
    setVisible: (val: boolean) => void;
}

const SUCCESS_CREATE = 'La video a été créé avec succès';
const SUCCESS_EDIT = 'Cette video a été modifié avec succès';

const VideoModal: FC<IVideoModalProps> = ({ visible, setVisible, formContext, initialValues }) => {
    const dispatch = useAppDispatch();
    const { error, loading } = useSelector(({ videos: { add } }: IRootState) => add);
    const { data: categories, loading: loadingCategories } = useSelector(
        ({ videos: { categories } }: IRootState) => categories,
    );
    const { data: users, loading: loadingUsers } = useSelector(({ users: { search } }: IRootState) => search);

    const [form] = useForm();
    const [success, setSuccess] = useState('');

    const onCloseModal = (): void => {
        setVisible(false);
    };

    const onSubmitVideo = (formData: IUnknownObject | IVideoData): void => {
        form.validateFields();
        const isEdit = formContext === EnumFormContext.EDIT;
        dispatch(
            addVideoAction({
                isEdit,
                data: formData as IVideoData,
            }),
        ).then((res) => {
            if (res.type === 'videos/add/fulfilled') setSuccess(isEdit ? SUCCESS_EDIT : SUCCESS_CREATE);
            if (res.type === 'videos/add/rejected') window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    useEffect(() => {
        setSuccess('');
        resetAddVideoAction()(dispatch);
        dispatch(getVideoCategoriesAction());
    }, []);

    return (
        <Modal
            centered
            footer={null}
            destroyOnClose
            closable={false}
            visible={visible}
            className={styles.videoModal}
            title={
                !success && (
                    <Row justify="space-between" align="middle">
                        <Col flex={1}>
                            <Title level={4}>Créer Video</Title>
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
                <CreateVideoForm
                    error={error}
                    formRef={form}
                    onSubmit={onSubmitVideo}
                    users={users as IUser[]}
                    formContext={formContext}
                    loadingUsers={loadingUsers}
                    initialValues={initialValues}
                    loadingCategories={loadingCategories}
                    categories={categories as ICategory[]}
                />
            )}
        </Modal>
    );
};

export default VideoModal;
