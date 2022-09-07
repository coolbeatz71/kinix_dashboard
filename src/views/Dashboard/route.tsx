import React from 'react';
import { DASHBOARD_PATH } from '@constants/paths';
import EnumRole from '@interfaces/role';

const Dashboard = React.lazy(() => import('.'));

const route = [
    {
        path: DASHBOARD_PATH,
        name: 'Dashboard',
        component: Dashboard,
        exact: true,
        extraProps: {
            isLoggedIn: true,
            roles: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
        },
    },
];

export default route;
