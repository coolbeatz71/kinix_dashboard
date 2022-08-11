import React, { FC } from 'react';
import { Typography } from 'antd';
import { upperFirst } from 'lodash';

import styles from './index.module.scss';

const { Title } = Typography;

export interface IOverviewTitleProps {
    title: string;
    color: string;
    icon: JSX.Element;
}

const OverviewTitle: FC<IOverviewTitleProps> = ({ title, icon, color }) => (
    <div className={styles.overviewTitle} style={{ background: color }}>
        {icon}
        <Title level={4}>{upperFirst(title)}</Title>
    </div>
);

export default OverviewTitle;
