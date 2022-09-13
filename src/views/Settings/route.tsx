import React from 'react';
import { SETTING_PATH } from '@constants/paths';
import EnumRole from '@interfaces/role';

const AccountSettings = React.lazy(() => import('.'));

const route = [
    {
        path: SETTING_PATH,
        name: 'Configuration',
        component: AccountSettings,
        exact: true,
        extraProps: {
            isLoggedIn: true,
            roles: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
        },
    },
];

export default route;
