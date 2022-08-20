import React, { FC, ReactElement } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

const { Title } = Typography;

export interface ISectionTitle {
    title: string;
    icon?: ReactElement;
    isRelated?: boolean;
    linkHasMore?: string;
}

const SectionTitle: FC<ISectionTitle> = ({ title, icon, linkHasMore, isRelated = false }) => {
    return (
        <div className={styles.sectionTitle} data-related={isRelated}>
            <Row justify="space-between" align="middle">
                <Col flex={1} className="d-flex align-items-center" data-icon>
                    {icon}
                    <Title level={3}>{title}</Title>
                </Col>

                {linkHasMore && (
                    <Col flex={4} className="d-flex justify-content-end">
                        <Button ghost type="primary">
                            <Link to={linkHasMore}>Voir Plus</Link>
                        </Button>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default SectionTitle;
