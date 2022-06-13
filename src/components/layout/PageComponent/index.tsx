import React, { FC, memo, Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import getCurrentUserAction from '@redux/user/getCurrentUser';
import { isEmpty } from 'lodash';
import Loading from '@components/common/Loading';
import { isAdmin } from '@constants/userRole';
import { IRoute } from '@interfaces/route';
import EnumRole from '@interfaces/userRole';
import routes from '@constants/routes';
import { ICurrentAdmin } from '@interfaces/admin';
import AppLayout from '@components/layout';
import { DASHBOARD_PATH, LOGIN_PATH } from '@constants/paths';

const PageComponent: FC = () => {
    const dispatch = useAppDispatch();
    const { data: userData } = useSelector(({ user }: IRootState) => user?.currentUser);

    useEffect(() => {
        if (isEmpty(userData)) dispatch(getCurrentUserAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filterCallback = ({ extraProps: { roles, isLoggedIn } }: IRoute): boolean | undefined => {
        if (!userData) return isLoggedIn === false;
        else if (isAdmin(userData?.role)) return roles?.includes(EnumRole.ADMIN);
        return roles?.includes(EnumRole.SUPER_ADMIN);
    };

    return (
        <Suspense fallback={<Loading spinning className="loadingContainer" />}>
            <Switch>
                {routes.filter(filterCallback).map((route, idx) => {
                    return (
                        route.component && (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                render={(props) => (
                                    <AppLayout currentUser={userData as ICurrentAdmin} title={route.name}>
                                        <route.component {...props} {...route.extraProps} />
                                    </AppLayout>
                                )}
                            />
                        )
                    );
                })}

                {userData?.isLoggedIn ? (
                    <Redirect to={DASHBOARD_PATH} exact={true} />
                ) : (
                    <Redirect to={LOGIN_PATH} exact={true} />
                )}
            </Switch>
        </Suspense>
    );
};

export default memo(PageComponent);
