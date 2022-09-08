import { ADMIN_PATH } from '@constants/paths';
import EnumRole from '@interfaces/role';
import Admins from '.';

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
