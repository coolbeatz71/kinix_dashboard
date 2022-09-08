import React, { FC, useState, useEffect } from 'react';
import { Form, Modal } from 'antd';
import { useAppDispatch } from '@redux/store';
import addArticleCommentAction, { resetAddCommentAction } from '@redux/comments/add';
import { IComment } from '@interfaces/api';
import FormSuccessResult from '@components/common/FormSuccessResult';
import CreateArticleComment from '@components/form/CreateArticleComment';
import { EnumFormContext } from '@interfaces/app';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import { ICommentData } from '@interfaces/comments';
import getAllArticleCommentsAction from '@redux/comments/getAll';

import styles from './index.module.scss';
import { CloseCircleOutlined } from '@ant-design/icons';

const { useForm } = Form;

export interface IUpdateArticleCommentModalProps {
    slug: string;
    openModal: boolean;
    initialValues: IComment;
    setOpenModal: (v: boolean) => void;
}

const UpdateArticleCommentModal: FC<IUpdateArticleCommentModalProps> = ({
    slug,
    openModal,
    setOpenModal,
    initialValues,
}) => {
    const [form] = useForm();
    const dispatch = useAppDispatch();
    const [success, setSuccess] = useState('');
    const { error: errAddComment, loading: loadAddComment } = useSelector(({ comments: { add } }: IRootState) => add);
    useEffect(() => {
        if (openModal) setSuccess('');
        resetAddCommentAction()(dispatch);
    }, [dispatch, openModal]);

    const onCloseModal = (): void => {
        setOpenModal(false);
        form.resetFields();
    };

    const onSubmitComment = (formData: ICommentData): void => {
        const { body } = formData;

        dispatch(addArticleCommentAction({ isEdit: true, data: { slug, body, id: initialValues.id } })).then((res) => {
            if (res.type === 'comments/add/rejected') form.resetFields();
            if (res.type === 'comments/add/fulfilled') {
                form.resetFields();
                setSuccess('commentaire modifié avec succès');
                dispatch(getAllArticleCommentsAction({ slug }));
            }
        });
    };

    return (
        <Modal
            centered
            width={520}
            footer={null}
            destroyOnClose
            visible={openModal}
            onCancel={onCloseModal}
            title="Modifier commentaire"
            closeIcon={<CloseCircleOutlined />}
            className={styles.updateCommentModal}
        >
            {success ? (
                <FormSuccessResult title={success} onClose={onCloseModal} />
            ) : (
                <CreateArticleComment
                    formRef={form}
                    error={errAddComment}
                    loading={loadAddComment}
                    onSubmit={onSubmitComment}
                    initialValues={initialValues}
                    formContext={EnumFormContext.EDIT}
                />
            )}
        </Modal>
    );
};

export default UpdateArticleCommentModal;
