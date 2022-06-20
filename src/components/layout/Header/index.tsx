import React, { FC } from 'react';
import { ICurrentAdmin } from '@interfaces/admin';
import getSideNavWidth from '@helpers/getSideNavWidth';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Grid, Layout, Row } from 'antd';
import formatName from '@helpers/formatName';
import { getAvatarColor } from '@helpers/getAvatarColor';

import styles from './index.module.scss';
import UserProfileMenu from '@components/common/UserProfileMenu';

const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;

export interface IHeaderProps {
    isSideNavExpanded: boolean;
    currentUser: ICurrentAdmin;
    setIsSideNavExpanded: (val: boolean) => void;
}

const Header: FC<IHeaderProps> = ({ isSideNavExpanded, setIsSideNavExpanded, currentUser }) => {
    const toggleSideNav = (): void => setIsSideNavExpanded(!isSideNavExpanded);
    const sideNavWidth = getSideNavWidth(isSideNavExpanded);

    const { lg } = useBreakpoint();

    const headerStyles = {
        left: sideNavWidth,
        width: `calc(100% - ${sideNavWidth}px)`,
    };

    return (
        <AntHeader className={styles.header} style={headerStyles} data-sidenav-close={isSideNavExpanded}>
            <Row align="middle" className={styles.header__row} justify="space-between">
                <Col xs={12} sm={12} lg={1} className="p-0">
                    <Button
                        type="text"
                        className="hamburger-menu"
                        size={lg ? 'large' : 'middle'}
                        onClick={toggleSideNav}
                        icon={<MenuOutlined />}
                    />
                </Col>
                <Col xs={12} sm={12} lg={23} className="d-flex flex-row-reverse">
                    {currentUser.isLoggedIn && (
                        <Dropdown
                            placement="bottomLeft"
                            className={styles.header__row__profile}
                            overlay={
                                <UserProfileMenu
                                    email={currentUser.email}
                                    avatar={currentUser.image}
                                    userName={currentUser.userName}
                                    phoneNumber={currentUser.phoneNumber}
                                />
                            }
                        >
                            <Button
                                type="text"
                                icon={
                                    <Avatar
                                        size="small"
                                        icon={<UserOutlined />}
                                        src={currentUser.image}
                                        style={{ backgroundColor: getAvatarColor(currentUser.userName) }}
                                    />
                                }
                            >
                                {formatName(currentUser.userName)}
                            </Button>
                        </Dropdown>
                    )}
                </Col>
            </Row>
        </AntHeader>
    );
};

export default Header;
