import React from 'react';
import { ARTICLE_PATH } from '@constants/paths';
import EnumRole from '@interfaces/role';

const Articles = React.lazy(() => import('.'));
const ViewArticle = React.lazy(() => import('./ViewArticle'));

const route = [
    {
        exact: true,
        name: 'Articles',
        path: ARTICLE_PATH,
        component: Articles,
        extraProps: {
            isLoggedIn: true,
            roles: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
        },
    },
    {
        exact: true,
        name: 'Article',
        component: ViewArticle,
        path: `${ARTICLE_PATH}/:slug`,
        extraProps: {
            isLoggedIn: true,
            roles: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
        },
    },
];

export default route;
