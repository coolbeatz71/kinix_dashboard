import React, { FC } from 'react';
import { Card, Typography } from 'antd';

import styles from './index.module.scss';

const { Title } = Typography;

const ChangePasswordForm: FC = () => {
    return (
        <Card bordered className={styles.changePassword}>
            <Title level={4}>Changer de mot de passe</Title>
        </Card>
    );
};

export default ChangePasswordForm;
