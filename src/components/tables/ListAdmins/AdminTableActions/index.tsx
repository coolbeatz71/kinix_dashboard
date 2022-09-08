import React, { FC, useState, Fragment } from 'react';
import { FormOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { IUser } from '@interfaces/api';
import { EnumUserActionContext, EnumFormContext } from '@interfaces/app';
import { IRootState } from '@redux/reducers';
import EnumRole from '@interfaces/role';
import UserModal from '@components/modal/UserModal';
import UserActionModal from '@components/modal/UserActionModal';

import styles from './index.module.scss';

export interface IUserTableActionsProps {
    admin: IUser;
    reload: () => void;
}

const AdminTableActions: FC<IUserTableActionsProps> = ({ admin, reload }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [openAddUserModal, setOpenAddUserModal] = useState(false);
    const { data: userData } = useSelector(({ users }: IRootState) => users?.currentUser);

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
                        {userData.role === EnumRole.SUPER_ADMIN && (
                            <Fragment>
                                <Button
                                    type="text"
                                    icon={<FormOutlined />}
                                    className={styles.actions__button}
                                    onClick={() => {
                                        setOpenMenu(false);
                                        setOpenAddUserModal(true);
                                    }}
                                >
                                    Modifier
                                </Button>

                                <UserModal
                                    reload={reload}
                                    accountType="admin"
                                    visible={openAddUserModal}
                                    initialValues={admin as IUser}
                                    setVisible={setOpenAddUserModal}
                                    formContext={EnumFormContext.EDIT}
                                />

                                <UserActionModal
                                    user={admin}
                                    reload={reload}
                                    accountType="admin"
                                    closeMenu={() => setOpenMenu(false)}
                                    context={admin.active ? EnumUserActionContext.BLOCK : EnumUserActionContext.UNBLOCK}
                                />

                                <UserActionModal
                                    user={admin}
                                    reload={reload}
                                    accountType="admin"
                                    closeMenu={() => setOpenMenu(false)}
                                    context={EnumUserActionContext.DELETE}
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

export default AdminTableActions;
