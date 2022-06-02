import React from 'react';
import { Card } from 'antd';
import LoginForm from '@components/form/Login';

import styles from './index.module.scss';

const Login = () => {
    return (
        <div className={styles.login}>
            <Card hoverable={false} className={styles.login__card}>
                <LoginForm />
            </Card>
        </div>
    );
};

export default Login;
