import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { EnumEmptyDataType } from '@constants/emptyDataType';
import EmptyData from '@components/common/EmptyData';

import styles from './index.module.scss';

export interface ILyricsProps {
    content: string | undefined;
}

const Lyrics: FC<ILyricsProps> = ({ content }) => {
    return !content ? (
        <EmptyData type={EnumEmptyDataType.LYRICS} desc={'Pas de paroles disponibles pour cette vidéo!'} />
    ) : (
        <Row className={styles.lyrics}>
            <Col sm={24} md={24} lg={12}>
                <div data-text>{content}</div>
            </Col>
        </Row>
    );
};

export default Lyrics;
