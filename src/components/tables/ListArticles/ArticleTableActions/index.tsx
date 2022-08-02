import React, { FC, useState, Fragment } from 'react';
import { FormOutlined, ReadOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { IArticle } from '@interfaces/api';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import EnumRole from '@interfaces/userRole';
import ArticleActionModal from '../ActionModal';
import { EnumActionContext, EnumFormContext } from '@interfaces/app';
import ArticleModal from '@components/modal/ArticleModal';
import { IArticleData } from '@interfaces/articles';

import styles from './index.module.scss';
export interface IArticleTableActionsProps {
    article: IArticle;
    reload: () => void;
}

const ArticleTableActions: FC<IArticleTableActionsProps> = ({ article, reload }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [openAddArticleModal, setOpenAddArticleModal] = useState(false);
    const { data: user } = useSelector(({ users }: IRootState) => users?.currentUser);

    return (
        <Fragment>
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
                                <Link to={`/articles/${article.slug}`} target="_blank" rel="noopener noreferrer">
                                    Ouvrir
                                </Link>
                            </span>
                        </Button>

                        <Button
                            type="text"
                            icon={<FormOutlined />}
                            className={styles.actions__button}
                            onClick={() => {
                                setOpenMenu(false);
                                setOpenAddArticleModal(true);
                            }}
                        >
                            Modifier
                        </Button>

                        <ArticleModal
                            reload={reload}
                            visible={openAddArticleModal}
                            setVisible={setOpenAddArticleModal}
                            formContext={EnumFormContext.EDIT}
                            initialValues={article as IArticleData}
                        />

                        {user.role === EnumRole.SUPER_ADMIN && (
                            <Fragment>
                                <ArticleActionModal
                                    reload={reload}
                                    article={article}
                                    closeMenu={() => setOpenMenu(false)}
                                    context={article.active ? EnumActionContext.DISABLE : EnumActionContext.APPROVE}
                                />

                                <ArticleActionModal
                                    reload={reload}
                                    article={article}
                                    context={EnumActionContext.DELETE}
                                    closeMenu={() => setOpenMenu(false)}
                                />
                            </Fragment>
                        )}
                    </Menu>
                }
            >
                <Button className={styles.actions__icon} type="link" icon={<SettingOutlined />} />
            </Dropdown>
        </Fragment>
    );
};

export default ArticleTableActions;
