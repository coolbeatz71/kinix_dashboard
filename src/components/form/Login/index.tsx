import React, { FC, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import emailValidator, { passwordValidator } from './validators';
import { useAppDispatch } from '@redux/store';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import loginAction, { resetLoginAction } from '@redux/auth/login';
import { ILoginData } from '@interfaces/auth';
import ErrorAlert from '@components/common/ErrorAlert';
import { DASHBOARD_PATH } from '@constants/paths';

import styles from './index.module.scss';

const { Item, useForm } = Form;
const { Password } = Input;

const btnStyles = `d-flex align-items-center justify-content-center`;

const LoginForm: FC = () => {
    const { error, loading } = useSelector(({ auth: { login } }: IRootState) => login);

    const [form] = useForm();
    const { replace } = useHistory();
    const dispatch = useAppDispatch();

    useEffect(() => {
        resetLoginAction()(dispatch);
    }, [dispatch]);

    const onSubmit = (formValues: ILoginData): void => {
        dispatch(loginAction({ data: formValues, dispatch })).then((res) => {
            if (res.type === 'auth/login/rejected') form.resetFields();
            if (res.type === 'auth/login/fulfilled') replace(DASHBOARD_PATH);
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
            <Item
                name="credential"
                label="Adresse e-mail"
                validateTrigger={['onSubmit', 'onBlur']}
                rules={emailValidator('Adresse e-mail')}
            >
                <Input size="large" placeholder="Adresse e-mail" />
            </Item>

            <Item
                name="password"
                label="Mot de passe"
                validateTrigger={['onSubmit', 'onBlur']}
                rules={passwordValidator('Mot de passe')}
            >
                <Password size="large" placeholder="••••••••••••••" visibilityToggle autoComplete="new-password" />
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
