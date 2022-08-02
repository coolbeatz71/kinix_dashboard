import React, { FC, useEffect, useState } from 'react';
import { Modal, Form } from 'antd';
import { useAppDispatch } from '@redux/store';
import { useSelector } from 'react-redux';
import CreateArticleForm from '@components/form/CreateArticle';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { IArticleData } from '@interfaces/articles';
import addArticleAction, { resetAddArticleAction } from '@redux/articles/add';
import { IRootState } from '@redux/reducers';
import FormSuccessResult from '../../common/FormSuccessResult';
import CreateModalHeader from '@components/common/CreateModalHeader';

import styles from './index.module.scss';

const { useForm } = Form;

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
    const isEdit = formContext === EnumFormContext.EDIT;
    const { error, loading } = useSelector(({ articles: { add } }: IRootState) => add);

    const [form] = useForm();
    const [success, setSuccess] = useState<string>('');

    const onCloseModal = (): void => {
        setVisible(false);
    };

    const onSubmitArticle = (formData: IUnknownObject | IArticleData): void => {
        form.validateFields();
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
        if (visible) setSuccess('');
        resetAddArticleAction()(dispatch);
    }, [dispatch, visible]);

    return (
        <Modal
            centered
            width={720}
            footer={null}
            destroyOnClose
            closable={false}
            visible={visible}
            className={styles.articleModal}
            wrapClassName={styles.articleModal__wrap}
            title={
                !success && (
                    <CreateModalHeader
                        isEdit={isEdit}
                        loading={loading}
                        context="article"
                        onCloseModal={onCloseModal}
                        onSubmit={() => form.submit()}
                    />
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
