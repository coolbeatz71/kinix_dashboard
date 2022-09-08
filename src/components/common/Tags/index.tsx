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
                <Tag data-type={type} color={type === 'article' ? 'geekblue' : 'default'} key={tag}>
                    #{tag}
                </Tag>
            ))}
        </Space>
    </div>
);

export default Tags;
