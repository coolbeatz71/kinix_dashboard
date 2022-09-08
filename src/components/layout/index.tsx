import React, { FC, Fragment, ReactNode, useCallback, useState, useEffect } from 'react';
import { upperFirst } from 'lodash';
import { Layout } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { APP_NAME } from '@constants/platform';
import Header from './Header';
import { ICurrentAdmin } from '@interfaces/admin';
import SideNav from './SideNav';
import getSideNavWidth from '@helpers/getSideNavWidth';
import { IUnknownObject } from '@interfaces/app';

import styles from './index.module.scss';

const { Content } = Layout;

export interface IAppLayoutProps {
    title?: string;
    children: ReactNode;
    currentUser: ICurrentAdmin;
}

const AppLayout: FC<IAppLayoutProps> = ({ title, currentUser, children }) => {
    const [isSideNavExpanded, setIsSideNavExpanded] = useState<boolean>(false);
    const sideNavWidth = getSideNavWidth(isSideNavExpanded);

    const contentStyles: IUnknownObject = {
        position: 'absolute',
        left: sideNavWidth,
        width: `calc(100% - ${sideNavWidth}px)`,
    };

    const [scrolled, setScrolled] = useState<string>('');

    const scrollHandler = useCallback(() => {
        setScrolled(window.pageYOffset > 80 ? 'scrolled' : '');
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, { passive: true });
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [scrollHandler]);

    return (
        <HelmetProvider>
            <Layout className={styles.layout}>
                <Helmet>
                    <title>
                        {title ? `${upperFirst(title)} | ` : ''}
                        {APP_NAME}
                    </title>
                </Helmet>

                {!currentUser?.isLoggedIn ? (
                    children
                ) : (
                    <Fragment>
                        <SideNav
                            currentUser={currentUser}
                            isSideNavExpanded={isSideNavExpanded}
                            setIsSideNavExpanded={setIsSideNavExpanded}
                        />
                        <div className={styles.layout__main}>
                            <Header
                                scrolled={scrolled}
                                currentUser={currentUser}
                                isSideNavExpanded={isSideNavExpanded}
                                setIsSideNavExpanded={setIsSideNavExpanded}
                            />
                            <Content style={contentStyles} className={styles.layout__main__content}>
                                {children}
                            </Content>
                        </div>
                    </Fragment>
                )}
            </Layout>
        </HelmetProvider>
    );
};

export default AppLayout;
