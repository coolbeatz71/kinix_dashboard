import { LOGIN_PATH } from '@constants/paths';
import Login from '.';

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
