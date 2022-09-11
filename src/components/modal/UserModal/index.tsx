import React, { FC, useEffect, useState } from 'react';
import { Modal, Form } from 'antd';
import { useAppDispatch } from '@redux/store';
import { useSelector } from 'react-redux';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { IRootState } from '@redux/reducers';
import FormSuccessResult from '@components/common/FormSuccessResult';
import addUserAction, { resetAddUserAction } from '@redux/users/add';
import { IUserData } from '@interfaces/users';
import CreateUserForm from '@components/form/CreateUser';
import { IUser } from '@interfaces/api';
import CreateModalHeader from '@components/common/CreateModalHeader';

import styles from './index.module.scss';

const { useForm } = Form;

export interface IUserModalProps {
    visible: boolean;
    reload?: () => void;
    initialValues?: IUser;
    formContext: EnumFormContext;
    accountType: 'client' | 'admin';
    setVisible: (val: boolean) => void;
}

const UserModal: FC<IUserModalProps> = ({
    visible,
    setVisible,
    formContext,
    accountType,
    initialValues,
    reload = () => {
        //
    },
}) => {
    const isClientRole = accountType === 'client';
    const SUCCESS_CREATE = isClientRole
        ? "L'utilisateur a été créé avec succès"
        : "L'administrateur a été créé avec succès";

    const SUCCESS_EDIT = isClientRole
        ? 'Cet utilisateur a été modifié avec succès'
        : 'Cet administrateur a été modifié avec succès';

    const [form] = useForm();
    const dispatch = useAppDispatch();
    const [success, setSuccess] = useState('');
    const isEdit = formContext === EnumFormContext.EDIT;
    const { error, loading } = useSelector(({ users: { add } }: IRootState) => add);

    const onCloseModal = (): void => {
        setVisible(false);
        form.resetFields();
    };

    const onSubmitUser = (formData: IUnknownObject | IUserData): void => {
        form.validateFields();
        const data = isEdit ? { ...formData, id: initialValues?.id } : formData;
        const { role } = formData;
        const isRoleAString = typeof role === 'string';

        const formattedData = isRoleAString
            ? { ...data, role: role?.toUpperCase() }
            : { ...data, role: (role as unknown as IUnknownObject).value };

        dispatch(
            addUserAction({
                isEdit,
                data: formattedData as IUserData,
            }),
        ).then((res) => {
            if (res.type === 'users/add/rejected') window.scrollTo({ top: 0, behavior: 'smooth' });
            if (res.type === 'users/add/fulfilled') {
                reload();
                setSuccess(isEdit ? SUCCESS_EDIT : SUCCESS_CREATE);
                form.resetFields();
            }
        });
    };

    useEffect(() => {
        if (visible) setSuccess('');
        resetAddUserAction()(dispatch);
    }, [dispatch, visible]);

    return (
        <Modal
            centered
            width={520}
            footer={null}
            destroyOnClose
            closable={false}
            visible={visible}
            className={styles.videoModal}
            title={
                !success && (
                    <CreateModalHeader
                        isEdit={isEdit}
                        loading={loading}
                        onCloseModal={onCloseModal}
                        onSubmit={() => form.submit()}
                        context={isClientRole ? 'utilisateur' : 'administrateur'}
                    />
                )
            }
        >
            {success ? (
                <FormSuccessResult title={success} onClose={onCloseModal} />
            ) : (
                <CreateUserForm
                    error={error}
                    formRef={form}
                    onSubmit={onSubmitUser}
                    formContext={formContext}
                    accountType={accountType}
                    initialValues={initialValues}
                />
            )}
        </Modal>
    );
};

export default UserModal;
