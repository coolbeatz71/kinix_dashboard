import React, { FC, memo, Suspense, useEffect } from 'react';
import { Redirect, Switch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import getCurrentUserAction from '@redux/users/getCurrentUser';
import { isEmpty } from 'lodash';
import { isAdmin, isSuperAdmin } from '@constants/roles';
import { IRoute } from '@interfaces/route';
import EnumRole from '@interfaces/role';
import routes from '@constants/routes';
import AppLayout from '@components/layout';
import { DASHBOARD_PATH, LOGIN_PATH, NOT_FOUND_PATH } from '@constants/paths';
import FancyRoute from '@components/common/FancyRoute';
import { ICurrentAdmin } from '@interfaces/admin';
import ScreenSkeleton from '@components/skeleton/Screen';

const PageComponent: FC = () => {
    const dispatch = useAppDispatch();
    const { data: user } = useSelector(({ users }: IRootState) => users?.currentUser);
    const { data: loginData } = useSelector(({ auth: { login } }: IRootState) => login);

    const { location } = useHistory();

    useEffect(() => {
        if (isEmpty(user)) dispatch(getCurrentUserAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const filterCallback = ({ extraProps: { roles, isLoggedIn } }: IRoute): boolean | undefined => {
        if (!user) return isLoggedIn === false;
        if (user && isAdmin(user?.role)) return roles?.includes(EnumRole.ADMIN);
        if (user && isSuperAdmin(user?.role)) return roles?.includes(EnumRole.SUPER_ADMIN);
        return roles ? roles?.includes(EnumRole.SUPER_ADMIN) : true;
    };

    const handleRedirect = (): JSX.Element => {
        const isRouteExist = routes.find((route) => route['path'] === location.pathname);

        if (!isRouteExist) return <Redirect to={NOT_FOUND_PATH} exact={true} />;
        else {
            return user?.isLoggedIn || loginData?.isLoggedIn ? (
                <Redirect to={DASHBOARD_PATH} exact />
            ) : (
                <Redirect to={LOGIN_PATH} exact />
            );
        }
    };

    return (
        <Suspense fallback={<ScreenSkeleton />}>
            <Switch>
                {routes.filter(filterCallback).map(
                    (route, idx) =>
                        route.component && (
                            <FancyRoute
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                render={(props) => (
                                    <AppLayout title={route.name} currentUser={user as ICurrentAdmin}>
                                        <route.component {...props} {...route.extraProps} />
                                    </AppLayout>
                                )}
                            />
                        ),
                )}

                {handleRedirect()}
            </Switch>
        </Suspense>
    );
};

export default memo(PageComponent);
