import React, { FC } from 'react';
import { Space, Tag } from 'antd';

import styles from './index.module.scss';

export interface IArticleTagsProps {
    tags: string[];
}

const ArticleTags: FC<IArticleTagsProps> = ({ tags }) => (
    <div className={styles.articleTags}>
        <Space>
            {tags?.map((tag) => (
                <Tag color="geekblue" key={tag}>
                    #{tag}
                </Tag>
            ))}
        </Space>
    </div>
);

export default ArticleTags;
