import React, { FC, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { IArticle } from '@interfaces/api';
import { useHistory } from 'react-router-dom';

import styles from './index.module.scss';

export interface IArticleTableActionsProps {
    record: IArticle;
    reload: () => void;
}

const ArticleTableActions: FC<IArticleTableActionsProps> = ({ record, reload }) => {
    const { push } = useHistory();
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Dropdown
                visible={visible}
                trigger={['click']}
                className={styles.actions}
                onVisibleChange={(v) => setVisible(v)}
                overlay={
                    <Menu>
                        <Button
                            type="text"
                            className={styles.actions__button}
                            onClick={() => push(`/articles/${record.slug}`)}
                        >
                            Ouvrir
                        </Button>
                    </Menu>
                }
            >
                <Button type="text" icon={<SettingOutlined />} />
            </Dropdown>
        </>
    );
};

export default ArticleTableActions;
