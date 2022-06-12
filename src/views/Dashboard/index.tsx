import Layout from '@components/layout';
import React, { FC } from 'react';

import styles from './index.module.scss';

const Dashboard: FC = () => {
    return (
        <Layout title="dashboard">
            <div className={styles.dashboard}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus consequatur id iusto illo sint
                itaque quibusdam cumque dolore. Quisquam, cum repellendus? Repellendus minus ea maiores eveniet, ullam
                vero aperiam rerum.
            </div>
        </Layout>
    );
};

export default Dashboard;
