import React, { FC, Fragment, Key, ReactNode, useState, useEffect, useCallback } from 'react';
import { Divider, Grid, Layout, Menu } from 'antd';
import getSideNavWidth from '@helpers/getSideNavWidth';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@components/common/Logo';
import { DASHBOARD_PATH } from '@constants/paths';
import { HomeFilled } from '@ant-design/icons';
import sidenav, { ISideNavSection } from '@constants/sidenav';
import { ICurrentAdmin } from '@interfaces/admin';
import { isAdmin } from '@constants/roles';
import { toUpper } from 'lodash';

import styles from './index.module.scss';

const { Sider } = Layout;
const { useBreakpoint } = Grid;
const { Item, SubMenu } = Menu;

export interface ISideNavProps {
    isSideNavExpanded: boolean;
    currentUser: ICurrentAdmin;
    setIsSideNavExpanded: (val: boolean) => void;
}

const defaultOpen = [sidenav[0].key];

const SideNav: FC<ISideNavProps> = ({ isSideNavExpanded, setIsSideNavExpanded, currentUser }) => {
    const { lg } = useBreakpoint();
    const { pathname } = useLocation();
    const sideNavWidth = getSideNavWidth(isSideNavExpanded);
    const menuStyles = { width: sideNavWidth };
    const [openSections, setOpenSections] = useState(defaultOpen);

    const getCurrentPathSection = useCallback((): number | undefined => {
        return sidenav.findIndex((nav) => nav.sub.find((subnav) => subnav.href === pathname));
    }, [pathname]);

    useEffect(() => {
        const activeSection = getCurrentPathSection();
        setOpenSections(activeSection ? [sidenav[activeSection]?.key] : defaultOpen);
    }, [getCurrentPathSection, pathname, isSideNavExpanded]);

    const onExpand = (collapsed: boolean): void => {
        setTimeout(() => setIsSideNavExpanded(!collapsed), 50);
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
                    getSubMenuItems(section.sub).map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Item
                                title={null}
                                key={item.text}
                                icon={item.icon}
                                data-active={isActive}
                                className={styles.sidenav__menu__items}
                            >
                                <Link to={item.href as string}>{item.text}</Link>
                            </Item>
                        );
                    })
                ) : (
                    <Fragment key={section.key}>
                        <Divider className={styles.sidenav__menu_divider} />
                        <SubMenu key={section.key} title={toUpper(section.title)} className={styles.sidenav__menu__sub}>
                            {getSubMenuItems(section.sub).map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Item
                                        key={item.text}
                                        icon={item.icon}
                                        data-active={isActive}
                                        className={styles.sidenav__menu__items}
                                    >
                                        <Link to={item.href as string}>{item.text}</Link>
                                    </Item>
                                );
                            })}
                        </SubMenu>
                    </Fragment>
                )}
            </Fragment>
        ));
    };

    const sideNavContent = (): ReactNode => {
        const isActive = pathname === DASHBOARD_PATH;
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
                    className={styles.sidenav__menu}
                    onOpenChange={onOpenSectionChange}
                >
                    <Item
                        title={null}
                        key="Dashboard"
                        data-active={isActive}
                        className={styles.sidenav__menu__items}
                        icon={<HomeFilled />}
                    >
                        <Link to={DASHBOARD_PATH}>Dashboard</Link>
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
