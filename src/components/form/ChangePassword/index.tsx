import React, { FC, useEffect } from 'react';
import { Button, Card, Form, Input, notification, Typography } from 'antd';
import ErrorAlert from '@components/common/ErrorAlert';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import FloatTextInput from '@components/common/FloatTextInput';
import { required } from '@helpers/validators';
import { useAppDispatch } from '@redux/store';
import { newPassword, passwordMatchValidator } from './validator';
import changePasswordAction, { resetChangePasswordAction } from '@redux/auth/changePassword';

import styles from './index.module.scss';

const { Password } = Input;
const { Title } = Typography;
const { Item, useForm } = Form;
const btnStyles = `d-flex align-items-center justify-content-center`;

const ChangePasswordForm: FC = () => {
    const [form] = useForm();
    const dispatch = useAppDispatch();
    const { loading, error } = useSelector(({ auth: { changePassword } }: IRootState) => changePassword);

    useEffect(() => {
        resetChangePasswordAction()(dispatch);
    }, [dispatch]);

    const onSubmit = (formData: { oldPassword: string; newPassword: string }): void => {
        const { oldPassword, newPassword } = formData;
        dispatch(
            changePasswordAction({
                oldPassword,
                newPassword,
            }),
        ).then((res) => {
            if (res.type === 'auth/changePassword/fulfilled') {
                form.resetFields();
                notification.success({
                    maxCount: 1,
                    key: 'success',
                    message: 'Youpi!',
                    placement: 'topRight',
                    description: 'Mot de passe changé avec succès',
                });
            }
        });
    };

    return (
        <Card bordered className={styles.changePassword}>
            <Title level={4} data-title>
                Changer de mot de passe
            </Title>
            <Form form={form} size="large" layout="vertical" onFinish={onSubmit} name="change_password">
                <ErrorAlert error={error} closable banner showIcon />

                <Item
                    name="oldPassword"
                    validateTrigger={['onSubmit', 'onBlur']}
                    rules={[required('Ancien mot de passe')]}
                >
                    <FloatTextInput label="Ancien mot de passe" placeholder="Ancien mot de passe" required>
                        <Password size="large" visibilityToggle autoComplete="new-password" />
                    </FloatTextInput>
                </Item>

                <Item
                    name="newPassword"
                    validateTrigger={['onSubmit', 'onBlur']}
                    rules={newPassword('Nouveau mot de passe')}
                >
                    <FloatTextInput label="Nouveau mot de passe" placeholder="Nouveau mot de passe" required>
                        <Password size="large" visibilityToggle autoComplete="new-password" />
                    </FloatTextInput>
                </Item>

                <Item
                    name="confNewPassword"
                    validateTrigger={['onSubmit', 'onBlur']}
                    rules={passwordMatchValidator('Confirmer nouveau mot de passe')}
                >
                    <FloatTextInput
                        required
                        label="Confirmer nouveau mot de passe"
                        placeholder="Confirmer nouveau mot de passe"
                    >
                        <Password size="large" visibilityToggle autoComplete="new-password" />
                    </FloatTextInput>
                </Item>

                <Button size="large" type="primary" htmlType="submit" loading={loading} className={`mt-2 ${btnStyles}`}>
                    Envoyer
                </Button>
            </Form>
        </Card>
    );
};

export default ChangePasswordForm;
