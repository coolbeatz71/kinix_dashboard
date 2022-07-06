import React, { FC } from 'react';
import { Card } from 'antd';
import LoginForm from '@components/form/Login';
import Logo from '@components/common/Logo';

import styles from './index.module.scss';

const Login: FC = () => {
    return (
        <div className={styles.login}>
            <Card hoverable={false} className={styles.login__card}>
                <Logo canRedirect={false} className={styles.login__card__logo} />
                <LoginForm />
            </Card>
        </div>
    );
};

export default Login;
