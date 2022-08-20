import React from 'react';
import { ARTICLE_PATH } from '@constants/paths';
import EnumRole from '@interfaces/role';

const Articles = React.lazy(() => import('.'));
const SingleArticle = React.lazy(() => import('./SingleArticle'));

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
        component: SingleArticle,
        path: `${ARTICLE_PATH}/:slug`,
        extraProps: {
            isLoggedIn: true,
            roles: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
        },
    },
];

export default route;
