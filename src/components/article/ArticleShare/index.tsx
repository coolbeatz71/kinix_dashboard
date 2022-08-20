import React, { FC } from 'react';
import { Button } from 'antd';
import { shareList } from '@constants/social';
import SocialShare from '@components/common/SocialShare';

import styles from './index.module.scss';

export interface IArticleShareProps {
    link: string;
    title: string;
}

type IShareType = 'facebook' | 'whatsapp' | 'twitter' | 'email' | 'copy';

const ArticleShare: FC<IArticleShareProps> = ({ link, title }) => {
    return (
        <div className={styles.articleShare}>
            {shareList.map((item) => (
                <SocialShare key={item.name} link={link} title={title} type={item.name as IShareType}>
                    <Button
                        shape="circle"
                        icon={item.icon}
                        data-platform={item.name}
                        className={styles.articleShare__button}
                    />
                </SocialShare>
            ))}
        </div>
    );
};

export default ArticleShare;
