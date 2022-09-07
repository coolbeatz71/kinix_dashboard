import React from 'react';
import { USER_PATH } from '@constants/paths';
import EnumRole from '@interfaces/role';

const Users = React.lazy(() => import('.'));

const route = [
    {
        path: USER_PATH,
        name: 'Utilisateurs',
        component: Users,
        exact: true,
        extraProps: {
            isLoggedIn: true,
            roles: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
        },
    },
];

export default route;
