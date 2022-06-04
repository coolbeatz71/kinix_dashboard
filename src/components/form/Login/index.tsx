import React, { FC, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import FloatTextInput from '@components/common/FloatTextInput';
import emailValidator, { passwordValidator } from './validators';
import { useAppDispatch } from '@redux/store';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import loginAction, { resetLoginAction } from '@redux/auth/login';
import { ILoginData } from '@interfaces/auth';
import ErrorAlert from '@components/common/ErrorAlert';

import styles from './index.module.scss';

const { Item, useForm } = Form;
const { Password } = Input;

const btnStyles = `d-flex align-items-center justify-content-center`;

const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const { error, loading } = useSelector(({ auth: { login } }: IRootState) => login);

    const [form] = useForm();

    useEffect(() => {
        resetLoginAction()(dispatch);
    }, [dispatch]);

    const onSubmit = (formValues: ILoginData): void => {
        const { credential, password } = formValues;
        dispatch(loginAction({ credential, password })).then((res) => {
            if (res.type === 'auth/login/rejected') form.resetFields();
        });
    };

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            name="admin_login"
            onFinish={onSubmit}
            className={styles.loginForm}
        >
            <Item name="credential" validateTrigger={['onSubmit', 'onBlur']} rules={emailValidator('Adresse e-mail')}>
                <FloatTextInput label="Adresse e-mail" placeholder="Adresse e-mail" required>
                    <Input size="large" />
                </FloatTextInput>
            </Item>

            <Item name="password" validateTrigger={['onSubmit', 'onBlur']} rules={passwordValidator('Mot de passe')}>
                <FloatTextInput label="Mot de passe" placeholder="Mot de passe" required>
                    <Password size="large" visibilityToggle />
                </FloatTextInput>
            </Item>

            <ErrorAlert error={error} showIcon closable banner />

            <Button
                block
                size="large"
                type="primary"
                htmlType="submit"
                loading={loading}
                className={`mt-2 ${btnStyles}`}
            >
                Connexion
            </Button>
        </Form>
    );
};

export default LoginForm;
