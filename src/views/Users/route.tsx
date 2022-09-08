import { USER_PATH } from '@constants/paths';
import EnumRole from '@interfaces/role';
import Users from '.';

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
