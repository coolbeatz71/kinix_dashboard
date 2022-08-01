import React, { FC, useState } from 'react';
import { ReadOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { IArticle } from '@interfaces/api';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import EnumRole from '@interfaces/userRole';
import ArticleActionModal from '../ActionModal';
import { EnumActionContext } from '@interfaces/app';

export interface IArticleTableActionsProps {
    record: IArticle;
    reload: () => void;
}

const ArticleTableActions: FC<IArticleTableActionsProps> = ({ record, reload }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const { data: user } = useSelector(({ users }: IRootState) => users?.currentUser);

    return (
        <>
            <Dropdown
                arrow
                visible={openMenu}
                trigger={['click']}
                className={styles.actions}
                onVisibleChange={(v) => setOpenMenu(v)}
                overlay={
                    <Menu className={styles.actions__menu}>
                        <Button type="text" icon={<ReadOutlined />} className={styles.actions__button}>
                            <span>
                                <Link to={`/articles/${record.slug}`} target="_blank" rel="noopener noreferrer">
                                    Ouvrir
                                </Link>
                            </span>
                        </Button>

                        {!record.active && user.role === EnumRole.SUPER_ADMIN && (
                            <ArticleActionModal
                                reload={reload}
                                article={record}
                                context={EnumActionContext.APPROVE}
                                closeMenu={() => setOpenMenu(false)}
                            />
                        )}

                        {record.active && user.role === EnumRole.SUPER_ADMIN && (
                            <ArticleActionModal
                                reload={reload}
                                article={record}
                                context={EnumActionContext.DISABLE}
                                closeMenu={() => setOpenMenu(false)}
                            />
                        )}

                        {user.role === EnumRole.SUPER_ADMIN && (
                            <ArticleActionModal
                                reload={reload}
                                article={record}
                                context={EnumActionContext.DELETE}
                                closeMenu={() => setOpenMenu(false)}
                            />
                        )}
                    </Menu>
                }
            >
                <Button className={styles.actions__icon} type="link" icon={<SettingOutlined />} />
            </Dropdown>
        </>
    );
};

export default ArticleTableActions;
