import React, { FC, useEffect, useState } from 'react';
import { Modal, Form } from 'antd';
import { useAppDispatch } from '@redux/store';
import { useSelector } from 'react-redux';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { IRootState } from '@redux/reducers';
import FormSuccessResult from '@components/common/FormSuccessResult';
import { IVideoData } from '@interfaces/videos';
import addVideoAction, { resetAddVideoAction } from '@redux/videos/add';
import CreateVideoForm from '@components/form/CreateVideo';
import getVideoCategoriesAction from '@redux/videos/getCategories';
import { ICategory, IUser, IVideo } from '@interfaces/api';
import CreateModalHeader from '@components/common/CreateModalHeader';

import styles from './index.module.scss';

const { useForm } = Form;

export interface IVideoModalProps {
    visible: boolean;
    reload?: () => void;
    initialValues?: IVideo;
    formContext: EnumFormContext;
    setVisible: (val: boolean) => void;
}

const SUCCESS_CREATE = 'La video a été créé avec succès';
const SUCCESS_EDIT = 'Cette video a été modifié avec succès';

const VideoModal: FC<IVideoModalProps> = ({
    visible,
    setVisible,
    formContext,
    initialValues,
    reload = () => {
        //
    },
}) => {
    const [form] = useForm();
    const dispatch = useAppDispatch();
    const isEdit = formContext === EnumFormContext.EDIT;

    const { data: categories, loading: loadingCategories } = useSelector(
        ({ videos: { categories } }: IRootState) => categories,
    );
    const { error, loading } = useSelector(({ videos: { add } }: IRootState) => add);
    const { data: users, loading: loadingUsers } = useSelector(({ users: { search } }: IRootState) => search);

    const [success, setSuccess] = useState('');

    const onCloseModal = (): void => {
        setVisible(false);
    };

    const onSubmitVideo = (formData: IUnknownObject | IVideoData): void => {
        form.validateFields();
        const data = isEdit ? { ...formData, slug: initialValues?.slug } : formData;
        dispatch(
            addVideoAction({
                isEdit,
                data: data as IVideoData,
            }),
        ).then((res) => {
            if (res.type === 'videos/add/rejected') window.scrollTo({ top: 0, behavior: 'smooth' });
            if (res.type === 'videos/add/fulfilled') {
                if (isEdit) reload();
                setSuccess(isEdit ? SUCCESS_EDIT : SUCCESS_CREATE);
            }
        });
    };

    useEffect(() => {
        if (visible) setSuccess('');
        resetAddVideoAction()(dispatch);
        dispatch(getVideoCategoriesAction());
    }, [dispatch, visible]);

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
                    <CreateModalHeader
                        context="video"
                        isEdit={isEdit}
                        loading={loading}
                        onCloseModal={onCloseModal}
                        onSubmit={() => form.submit()}
                    />
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
