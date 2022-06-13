import React, { FC } from 'react';
import { ICurrentAdmin } from '@interfaces/admin';
import getSideNavWidth from '@helpers/getSideNavWidth';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Grid, Layout, Menu, Row } from 'antd';
import formatName from '@helpers/formatName';
import { getAvatarColor } from '@helpers/getAvatarColor';

import styles from './index.module.scss';

const { Header: AntHeader } = Layout;
const { Item } = Menu;
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

    const UserProfileMenu = (
        <Menu>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis enim, suscipit culpa deserunt similique
            adipisci ducimus quisquam expedita, quod temporibus doloremque cupiditate optio vero porro dolorem
            voluptatem omnis, quis nulla.
            <Item>Settings</Item>
            <Item>Settings</Item>
        </Menu>
    );

    return (
        <AntHeader
            className={styles.header}
            style={lg ? headerStyles : undefined}
            data-sidenav-close={isSideNavExpanded}
        >
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
                            overlay={UserProfileMenu}
                            className={styles.header__row__profile}
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
