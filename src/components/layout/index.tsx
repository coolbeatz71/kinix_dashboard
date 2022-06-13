import { upperFirst } from 'lodash';
import React, { FC, Fragment, ReactNode, useState } from 'react';

import { Layout } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { APP_NAME } from '@constants/platform';
import Header from './Header';
import { ICurrentAdmin } from '@interfaces/admin';
import SideNav from './SideNav';

import styles from './index.module.scss';

const { Content } = Layout;

export interface IAppLayoutProps {
    title?: string;
    children: ReactNode;
    currentUser: ICurrentAdmin;
}

const AppLayout: FC<IAppLayoutProps> = ({ title, currentUser, children }) => {
    const [isSideNavExpanded, setIsSideNavExpanded] = useState<boolean>(false);

    const _title = upperFirst(title) || '';

    return (
        <HelmetProvider>
            <Layout className={styles.layout}>
                <Helmet>
                    <title>
                        {title ? `${_title} | ` : ''}
                        {APP_NAME}
                    </title>
                </Helmet>

                {currentUser?.isLoggedIn ? (
                    <Fragment>
                        <SideNav
                            currentUser={currentUser}
                            isSideNavExpanded={isSideNavExpanded}
                            setIsSideNavExpanded={setIsSideNavExpanded}
                        />
                        <div className={styles.layout__main}>
                            <Header
                                currentUser={currentUser}
                                isSideNavExpanded={isSideNavExpanded}
                                setIsSideNavExpanded={setIsSideNavExpanded}
                            />
                            <Content className={styles.layout__main__content}>{children}</Content>
                        </div>
                    </Fragment>
                ) : (
                    children
                )}
            </Layout>
        </HelmetProvider>
    );
};

export default AppLayout;
