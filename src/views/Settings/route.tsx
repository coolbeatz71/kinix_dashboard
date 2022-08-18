import { SETTING_PATH } from '@constants/paths';
import EnumRole from '@interfaces/role';
import AccountSettings from '.';

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
