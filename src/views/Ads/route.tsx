import React from 'react';
import { ADS_PATH } from '@constants/paths';
import EnumRole from '@interfaces/role';

const Ads = React.lazy(() => import('.'));

const route = [
    {
        path: ADS_PATH,
        name: 'Ads',
        component: Ads,
        exact: true,
        extraProps: {
            isLoggedIn: true,
            roles: [EnumRole.SUPER_ADMIN],
        },
    },
];

export default route;
