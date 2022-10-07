import React, { FC, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import { Button, Dropdown, Menu } from 'antd';
import EnumRole from '@interfaces/role';
import { IStory } from '@interfaces/api';
import { FormOutlined, SettingOutlined } from '@ant-design/icons';
import { EnumPromotionActionContext, EnumFormContext } from '@interfaces/app';
import StoryModal from '@components/modal/StoryModal';
import StoryActionModal from '../ActionModal';

import styles from './index.module.scss';

export interface IStoryTableActionsProps {
    story: IStory;
    reload: () => void;
}

const StoryTableActions: FC<IStoryTableActionsProps> = ({ story, reload }) => {
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

                                <StoryModal
                                    reload={reload}
                                    initialValues={story}
                                    visible={openAddUserModal}
                                    setVisible={setOpenAddUserModal}
                                    formContext={EnumFormContext.EDIT}
                                />

                                <StoryActionModal
                                    story={story}
                                    reload={reload}
                                    closeMenu={() => setOpenMenu(false)}
                                    context={
                                        story.active
                                            ? EnumPromotionActionContext.DISABLE
                                            : EnumPromotionActionContext.ENABLE
                                    }
                                />

                                <StoryActionModal
                                    story={story}
                                    reload={reload}
                                    closeMenu={() => setOpenMenu(false)}
                                    context={EnumPromotionActionContext.DELETE}
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

export default StoryTableActions;
