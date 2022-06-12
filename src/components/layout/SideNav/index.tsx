import React, { FC, ReactNode } from 'react';
import { Divider, Grid, Layout, Menu } from 'antd';
import getSideNavWidth from '@helpers/getSideNavWidth';
import Logo from '@components/common/Logo';
import { HOME_PATH } from '@constants/paths';
import { HomeFilled } from '@ant-design/icons';

import styles from './index.module.scss';

const { Sider } = Layout;
const { useBreakpoint } = Grid;
const { Item } = Menu;
export interface ISideNavProps {
    isSideNavExpanded: boolean;
    setIsSideNavExpanded: (val: boolean) => void;
}

const SideNav: FC<ISideNavProps> = ({ isSideNavExpanded, setIsSideNavExpanded }) => {
    const sideNavWidth = getSideNavWidth(isSideNavExpanded);
    const menuStyles = { width: sideNavWidth };

    const { lg } = useBreakpoint();

    const onExpand = (collapsed: boolean): void => {
        // if (!collapsed) setOpenSections(defaultOpen);
        setIsSideNavExpanded(!collapsed);
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
                    // openKeys={openSections}
                    // onOpenChange={onOpenSectionChange}
                    className={styles.sidenav__menu}
                >
                    <Item title={null} className={styles.sidenav__menu__items} icon={<HomeFilled />}>
                        <a href={HOME_PATH}>Home</a>
                    </Item>
                </Menu>
            </>
        );
    };

    return (
        <Sider
            collapsible
            onCollapse={onExpand}
            className={styles.sidenav}
            collapsed={!isSideNavExpanded}
            collapsedWidth={sideNavWidth}
            data-expanded={isSideNavExpanded}
            zeroWidthTriggerStyle={{ display: 'none' }}
        >
            {sideNavContent()}
        </Sider>
    );
};

export default SideNav;
