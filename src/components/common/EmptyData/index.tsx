import React, { FC } from 'react';
import { Button, Empty } from 'antd';
import { EnumEmptyDataType } from '@constants/emptyDataType';

import emptyContent from '@assets/feedback/empty-content.svg';
import emptySearch from '@assets/feedback/empty-search.svg';

import styles from './index.module.scss';

export interface IEmptyDataProps {
    desc: string;
    hasButton?: boolean;
    buttonText?: string;
    buttonLink?: string;
    type: EnumEmptyDataType;
}

const EmptyData: FC<IEmptyDataProps> = ({ type, desc, hasButton = false, buttonText = '', buttonLink = '' }) => {
    const getImageUrl = (): string => {
        switch (type) {
            case EnumEmptyDataType.CONTENT:
                return emptyContent;
            case EnumEmptyDataType.SEARCH:
                return emptySearch;
            case EnumEmptyDataType.LYRICS:
                return emptySearch;
            default:
                return emptySearch;
        }
    };

    return (
        <Empty image={getImageUrl()} className={styles.emptyData} description={<span>{desc}</span>}>
            {hasButton && (
                <Button type="primary" href={buttonLink}>
                    {buttonText}
                </Button>
            )}
        </Empty>
    );
};

export default EmptyData;
