import React, { FC } from 'react';
import { Form, FormInstance, Input, Select } from 'antd';
import ReRegExp from 'reregexp';
import { IUser } from '@interfaces/api';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { IUserData } from '@interfaces/users';
import ErrorAlert from '@components/common/ErrorAlert';
import FloatTextInput from '@components/common/FloatTextInput';
import { emailValidator, passwordRegex, roleValidator, userNameValidator } from './validators';
import { ADMINS_FILTER_LIST, CLIENTS_FILTER_LIST } from '@constants/app';

const { Item } = Form;

export interface IcreateUserProps {
    initialValues?: IUser;
    accountType: 'client' | 'admin';
    formContext: EnumFormContext;
    formRef: FormInstance<IUserData>;
    onSubmit: (val: IUserData) => void;
    error: Error | IUnknownObject | null;
}

const CreateUser: FC<IcreateUserProps> = ({ initialValues, formContext, formRef, onSubmit, error, accountType }) => {
    const isEdit = formContext === EnumFormContext.EDIT;
    const isClientRole = accountType === 'client';

    const onSubmitUser = (formData: IUserData): void => {
        const password = new ReRegExp(passwordRegex).build();
        onSubmit({ password, ...formData });
    };

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
                    <Select
                        size="large"
                        filterOption={false}
                        defaultActiveFirstOption={false}
                        options={isClientRole ? CLIENTS_FILTER_LIST.slice(1) : ADMINS_FILTER_LIST.slice(1)}
                    />
                </FloatTextInput>
            </Item>
        </Form>
    );
};

export default CreateUser;
