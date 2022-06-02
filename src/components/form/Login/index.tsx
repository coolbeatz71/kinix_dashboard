import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';
import FloatTextInput from '@components/common/FloatTextInput';

import styles from './index.module.scss';

const { Item } = Form;
const { Password } = Input;

const btnStyles = `d-flex align-items-center justify-content-center`;

const LoginForm: FC = () => {
    return (
        <Form size="large" name="admin_login" className={styles.loginForm} layout="vertical">
            <Item name="credential" validateTrigger={['onSubmit', 'onBlur']}>
                <FloatTextInput label="Email" placeholder="Email address" required>
                    <Input size="large" />
                </FloatTextInput>
            </Item>

            <Item name="password" validateTrigger={['onSubmit', 'onBlur']}>
                <FloatTextInput label="Password" placeholder="Password" required>
                    <Password size="large" visibilityToggle />
                </FloatTextInput>
            </Item>

            <Button block size="large" type="primary" htmlType="submit" className={`mt-2 ${btnStyles}`}>
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;
