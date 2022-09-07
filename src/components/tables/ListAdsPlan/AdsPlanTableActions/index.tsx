import React, { FC, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import { Button, Dropdown, Menu } from 'antd';
import EnumRole from '@interfaces/role';
import { FormOutlined, SettingOutlined } from '@ant-design/icons';
import { EnumFormContext } from '@interfaces/app';
import PromotionPlanModal from '@components/modal/PromotionPlanModal';
import { IAdsPlanData } from '@interfaces/promotion';

import styles from './index.module.scss';

export interface IAdsPlanTableActionsProps {
    plan: IAdsPlanData;
    reload: () => void;
}

const AdsPlanTableActions: FC<IAdsPlanTableActionsProps> = ({ plan, reload }) => {
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

                                <PromotionPlanModal
                                    type="ads"
                                    reload={reload}
                                    initialValues={plan}
                                    visible={openAddUserModal}
                                    setVisible={setOpenAddUserModal}
                                    formContext={EnumFormContext.EDIT}
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

export default AdsPlanTableActions;
