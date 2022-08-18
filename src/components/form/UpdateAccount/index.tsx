import React, { FC } from 'react';
import { Card, Typography } from 'antd';

import styles from './index.module.scss';

const { Title } = Typography;

const UpdateAccountForm: FC = () => {
    return (
        <Card bordered className={styles.updateAccount}>
            <Title level={4}>Informations sur le compte</Title>
        </Card>
    );
};

export default UpdateAccountForm;
