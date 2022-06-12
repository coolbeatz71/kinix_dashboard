import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import getCurrentUserAction from '@redux/user/getCurrentUser';
import { isEmpty, upperFirst } from 'lodash';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout as AntLayout } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { APP_NAME } from '@constants/platform';
import Header from './Header';
import { ICurrentAdmin } from '@interfaces/admin';
import SideNav from './SideNav';

import styles from './index.module.scss';

const { Content } = AntLayout;

export interface ILayoutProps {
    children: ReactElement;
    title?: string;
}

const Layout: FC<ILayoutProps> = ({ children, title }) => {
    const [isSideNavExpanded, setIsSideNavExpanded] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { data: userData } = useSelector(({ user }: IRootState) => user?.currentUser);

    useEffect(() => {
        if (isEmpty(userData)) dispatch(getCurrentUserAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const _title = upperFirst(title) || '';

    return (
        <HelmetProvider>
            <AntLayout className={styles.layout}>
                <Helmet>
                    <title>
                        {title ? `${_title} | ` : ''}
                        {APP_NAME}
                    </title>
                </Helmet>

                <SideNav isSideNavExpanded={isSideNavExpanded} setIsSideNavExpanded={setIsSideNavExpanded} />

                <div className={styles.layout__main}>
                    <Header
                        isSideNavExpanded={isSideNavExpanded}
                        setIsSideNavExpanded={setIsSideNavExpanded}
                        currentUser={userData as ICurrentAdmin}
                    />

                    <Content className={styles.layout__main__content}>{children}</Content>
                </div>
            </AntLayout>
        </HelmetProvider>
    );
};

export default Layout;
