import React, { FC, ReactNode } from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import styles from './index.module.scss';

const { Title } = Typography;

export interface ITableTitleProps {
    goBack?: boolean;
    extra?: ReactNode;
    children: ReactNode;
    onClick?: () => void;
    level?: 1 | 2 | 3 | 4 | 5;
}

const TableTitle: FC<ITableTitleProps> = ({ children, goBack = false, onClick, level = 4, extra }) => {
    const history = useHistory();
    return (
        <Row align="middle">
            {goBack && (
                <Col>
                    <Button
                        type="link"
                        icon={<ArrowLeftOutlined />}
                        className={styles.tableTitle__button}
                        onClick={() => (onClick ? onClick() : history.goBack())}
                    />
                </Col>
            )}
            <Col flex={1}>
                <Title level={level} className={styles.tableTitle__typography}>
                    {children}
                </Title>
            </Col>
            {extra && <Col>{extra}</Col>}
        </Row>
    );
};

export default TableTitle;
