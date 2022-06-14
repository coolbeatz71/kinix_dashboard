import React, { FC, memo, Suspense, useEffect } from 'react';
import { Redirect, Switch } from 'react-router-dom';
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
import AppLayout from '@components/layout';
import { DASHBOARD_PATH, LOGIN_PATH } from '@constants/paths';
import FancyRoute from '@components/common/FancyRoute';
import { ICurrentAdmin } from '@interfaces/admin';

const PageComponent: FC = () => {
    const dispatch = useAppDispatch();
    const { data: user } = useSelector(({ user }: IRootState) => user?.currentUser);
    const { data: loginData } = useSelector(({ auth: { login } }: IRootState) => login);

    //TODO handle currentUser on the redux side
    const localUser = {
        isLoggedIn: true,
        role: EnumRole.ADMIN,
    };

    useEffect(() => {
        if (isEmpty(user)) dispatch(getCurrentUserAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const filterCallback = ({ extraProps: { roles, isLoggedIn } }: IRoute): boolean | undefined => {
        if (!localUser) return isLoggedIn === false;
        if (localUser && isAdmin(localUser?.role)) return roles?.includes(EnumRole.ADMIN);
        return roles ? roles?.includes(EnumRole.ADMIN) : true;
    };

    return (
        <Suspense fallback={<Loading spinning className="loadingContainer" />}>
            <Switch>
                {routes.filter(filterCallback).map((route, idx) => {
                    return (
                        route.component && (
                            <FancyRoute
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                render={(props) => (
                                    <AppLayout title={route.name} currentUser={localUser as ICurrentAdmin}>
                                        <route.component {...props} {...route.extraProps} />
                                    </AppLayout>
                                )}
                            />
                        )
                    );
                })}

                {localUser?.isLoggedIn || loginData?.isLoggedIn ? (
                    <Redirect to={DASHBOARD_PATH} exact={true} />
                ) : (
                    <Redirect to={LOGIN_PATH} exact={true} />
                )}
            </Switch>
        </Suspense>
    );
};

export default memo(PageComponent);
