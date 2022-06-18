import React, { FC } from 'react';
import { Card } from 'antd';
import LoginForm from '@components/form/Login';

import styles from './index.module.scss';
import Logo from '@components/common/Logo';

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
