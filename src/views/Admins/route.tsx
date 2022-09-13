import React from 'react';
import { ADMIN_PATH } from '@constants/paths';
import EnumRole from '@interfaces/role';

const Admins = React.lazy(() => import('.'));

const route = [
    {
        path: ADMIN_PATH,
        name: 'Administrateurs',
        component: Admins,
        exact: true,
        extraProps: {
            isLoggedIn: true,
            roles: [EnumRole.SUPER_ADMIN],
        },
    },
];

export default route;
