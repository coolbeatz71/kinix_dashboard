import React from 'react';
import { LOGIN_PATH } from '@constants/paths';

const Login = React.lazy(() => import('.'));

const route = [
    {
        path: LOGIN_PATH,
        name: 'Connexion',
        component: Login,
        exact: true,
        extraProps: {
            isLoggedIn: false,
        },
    },
];

export default route;
