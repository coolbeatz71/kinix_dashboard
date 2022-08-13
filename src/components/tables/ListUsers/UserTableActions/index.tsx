import React, { FC, useState, Fragment } from 'react';
import { FormOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { IUser } from '@interfaces/api';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import EnumRole from '@interfaces/role';
import UserActionModal from '../ActionModal';
import { EnumUserActionContext, EnumFormContext } from '@interfaces/app';
import UserModal from '@components/modal/UserModal';
import { IUserData } from '@interfaces/users';

import styles from './index.module.scss';
export interface IUserTableActionsProps {
    user: IUser;
    reload: () => void;
}

const UserTableActions: FC<IUserTableActionsProps> = ({ user, reload }) => {
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
                            visible={openAddUserModal}
                            setVisible={setOpenAddUserModal}
                            formContext={EnumFormContext.EDIT}
                            initialValues={user as IUserData}
                        />

                        <UserActionModal
                            user={user}
                            reload={reload}
                            closeMenu={() => setOpenMenu(false)}
                            context={user.active ? EnumUserActionContext.BLOCK : EnumUserActionContext.UNBLOCK}
                        />

                        {userData.role === EnumRole.SUPER_ADMIN && (
                            <UserActionModal
                                reload={reload}
                                user={user}
                                context={EnumUserActionContext.DELETE}
                                closeMenu={() => setOpenMenu(false)}
                            />
                        )}
                    </Menu>
                }
            >
                <Button className={styles.actions__icon} type="link" icon={<SettingOutlined />} />
            </Dropdown>
        </Fragment>
    );
};

export default UserTableActions;
