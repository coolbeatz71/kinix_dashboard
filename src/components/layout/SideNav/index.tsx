import React, { FC, Fragment, Key, ReactNode, useState } from 'react';
import { Divider, Grid, Layout, Menu } from 'antd';
import getSideNavWidth from '@helpers/getSideNavWidth';
import Logo from '@components/common/Logo';
import { LOGIN_PATH } from '@constants/paths';
import { HomeFilled } from '@ant-design/icons';

import styles from './index.module.scss';
import sidenav, { ISideNavSection } from '@constants/sidenav';
import { ICurrentAdmin } from '@interfaces/admin';
import { isAdmin } from '@constants/userRole';
import { toUpper } from 'lodash';

const { Sider } = Layout;
const { useBreakpoint } = Grid;
const { Item, SubMenu } = Menu;

export interface ISideNavProps {
    isSideNavExpanded: boolean;
    currentUser: ICurrentAdmin;
    setIsSideNavExpanded: (val: boolean) => void;
}

const defaultOpen = [sidenav[1].key];

const SideNav: FC<ISideNavProps> = ({ isSideNavExpanded, setIsSideNavExpanded, currentUser }) => {
    const { lg } = useBreakpoint();
    const sideNavWidth = getSideNavWidth(isSideNavExpanded);
    const menuStyles = { width: sideNavWidth };

    const [openSections, setOpenSections] = useState(defaultOpen);

    const onExpand = (collapsed: boolean): void => {
        if (!collapsed) setOpenSections(defaultOpen);
        setIsSideNavExpanded(!collapsed);
    };

    const onOpenSectionChange = (keys: Key[]): void => {
        const lastOpenKey = keys.find((key) => openSections.indexOf(key as string) === -1);
        const lastOpenSection = sidenav.find((section) => section.key === lastOpenKey);

        if (!lastOpenSection) setOpenSections(keys as string[]);
        else setOpenSections(lastOpenKey ? [lastOpenKey as string] : []);
    };

    const getSubMenuItems = (sub: ISideNavSection[]): ISideNavSection[] => {
        const menuItems = sub.filter((subNav) => {
            if (!currentUser) return false;
            if (isAdmin(currentUser.role)) return subNav.role.includes(currentUser.role);
            return subNav;
        });

        return menuItems;
    };

    const renderSections = (isExpanded: boolean): ReactNode => {
        return sidenav.map((section) => (
            <Fragment key={section.key}>
                {!isExpanded ? (
                    getSubMenuItems(section.sub).map((item) => (
                        <Item title={null} className={styles.sidenav__menu__items} key={item.text} icon={item.icon}>
                            {item.text}
                        </Item>
                    ))
                ) : (
                    <Fragment key={section.key}>
                        <Divider className={styles.sidenav__menu_divider} />
                        <SubMenu key={section.key} title={toUpper(section.title)} className={styles.sidenav__menu__sub}>
                            {getSubMenuItems(section.sub).map((item) => (
                                <Item className={styles.sidenav__menu__items} key={item.text} icon={item.icon}>
                                    <a href={item.href}>{item.text}</a>
                                </Item>
                            ))}
                        </SubMenu>
                    </Fragment>
                )}
            </Fragment>
        ));
    };

    const sideNavContent = (): ReactNode => {
        return (
            <>
                {lg && <Logo canRedirect className={styles.sidenav__logo} />}
                {lg && (
                    <div className={styles.sidenav__divider}>
                        <Divider />
                    </div>
                )}
                <Menu
                    mode="inline"
                    style={menuStyles}
                    openKeys={openSections}
                    onOpenChange={onOpenSectionChange}
                    className={styles.sidenav__menu}
                >
                    <Item title={null} className={styles.sidenav__menu__items} icon={<HomeFilled />}>
                        <a href={LOGIN_PATH}>Dashboard</a>
                    </Item>

                    {renderSections(isSideNavExpanded)}
                </Menu>
            </>
        );
    };

    return (
        <Sider
            collapsible
            onCollapse={onExpand}
            className={styles.sidenav}
            collapsedWidth={sideNavWidth}
            collapsed={!isSideNavExpanded}
            data-expanded={isSideNavExpanded}
            zeroWidthTriggerStyle={{ display: 'none' }}
        >
            {sideNavContent()}
        </Sider>
    );
};

export default SideNav;
