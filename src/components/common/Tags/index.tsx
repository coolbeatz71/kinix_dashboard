import React, { FC } from 'react';
import { Space, Tag } from 'antd';

import styles from './index.module.scss';

export interface ITagsProps {
    tags: string[];
    type: 'article' | 'video';
}

const Tags: FC<ITagsProps> = ({ tags, type = 'article' }) => (
    <div className={styles.tags}>
        <Space>
            {tags?.map((tag) => (
                <Tag color={type === 'article' ? 'geekblue' : 'volcano'} key={tag}>
                    #{tag}
                </Tag>
            ))}
        </Space>
    </div>
);

export default Tags;
