import React from 'react';
import { VIDEO_PATH } from '@constants/paths';
import EnumRole from '@interfaces/role';

const Videos = React.lazy(() => import('.'));
const ViewVideo = React.lazy(() => import('./ViewVideo'));

const route = [
    {
        exact: true,
        name: 'Videos',
        path: VIDEO_PATH,
        component: Videos,
        extraProps: {
            isLoggedIn: true,
            roles: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
        },
    },
    {
        exact: true,
        name: 'Videos',
        path: `${VIDEO_PATH}/:category`,
        component: Videos,
        extraProps: {
            isLoggedIn: true,
            roles: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
        },
    },
    {
        exact: true,
        name: 'Video',
        component: ViewVideo,
        path: `${VIDEO_PATH}/watch/:slug`,
        extraProps: {
            isLoggedIn: true,
            roles: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
        },
    },
];

export default route;
