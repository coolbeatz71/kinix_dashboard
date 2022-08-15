import React, { FC, useEffect } from 'react';
import { Form, FormInstance, Input, Select } from 'antd';
import RandExp from 'randexp';
import { IUser } from '@interfaces/api';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { IUserData } from '@interfaces/users';
import ErrorAlert from '@components/common/ErrorAlert';
import FloatTextInput from '@components/common/FloatTextInput';
import { emailValidator, roleValidator, userNameValidator } from './validators';
import { ADMINS_FILTER_LIST, CLIENTS_FILTER_LIST } from '@constants/app';
import EnumRole from '@interfaces/role';
import { adminRoleLabelObj, clientRoleLabelObj } from '@constants/roles';

const { Item } = Form;

export interface IcreateUserProps {
    initialValues?: IUser;
    accountType: 'client' | 'admin';
    formContext: EnumFormContext;
    formRef: FormInstance<IUserData>;
    onSubmit: (val: IUserData) => void;
    error: Error | IUnknownObject | null;
}

const CreateUserForm: FC<IcreateUserProps> = ({
    error,
    formRef,
    onSubmit,
    formContext,
    accountType,
    initialValues,
}) => {
    const isClientRole = accountType === 'client';
    const isEdit = formContext === EnumFormContext.EDIT;
    const roleOptions = isClientRole ? CLIENTS_FILTER_LIST.slice(1) : ADMINS_FILTER_LIST.slice(1);

    const onSubmitUser = (formData: IUserData): void => {
        if (isEdit) onSubmit(formData);
        else {
            const password = new RandExp('([a-z][A-Z][0-9]){6}').gen();
            onSubmit({ password, ...formData });
        }
    };

    useEffect(() => {
        if (isEdit) {
            const { role } = initialValues as IUser;
            const roleLabel = isClientRole ? clientRoleLabelObj : adminRoleLabelObj;
            formRef.setFieldsValue({
                role: {
                    value: initialValues?.role,
                    label: roleLabel[role as EnumRole],
                } as unknown as EnumRole,
            });
        }
    }, [formRef, initialValues, isClientRole, isEdit]);

    return (
        <Form
            size="large"
            form={formRef}
            layout="vertical"
            name="create_user"
            onFinish={onSubmitUser}
            initialValues={isEdit ? initialValues : {}}
        >
            <ErrorAlert error={error} closable banner showIcon />

            <Item
                name="userName"
                validateTrigger={['onSubmit', 'onBlur']}
                rules={userNameValidator("Nom d'utilisateur")}
            >
                <FloatTextInput label="Nom d'utilisateur" placeholder="Nom d'utilisateur" required>
                    <Input size="large" />
                </FloatTextInput>
            </Item>

            <Item name="email" validateTrigger={['onSubmit', 'onBlur']} rules={emailValidator('Adresse e-mail')}>
                <FloatTextInput label="Adresse e-mail" placeholder="Adresse e-mail" required>
                    <Input size="large" />
                </FloatTextInput>
            </Item>

            <Item name="role" validateTrigger={['onSubmit', 'onBlur']} rules={roleValidator('Type de compte')}>
                <FloatTextInput label="Type de compte" placeholder="Sélectionner le type de compte" required>
                    <Select size="large" filterOption={false} options={roleOptions} defaultActiveFirstOption={false} />
                </FloatTextInput>
            </Item>
        </Form>
    );
};

export default CreateUserForm;
