import { VIDEO_PATH } from '@constants/paths';
import EnumRole from '@interfaces/userRole';
import Videos from '.';

const route = [
    {
        path: VIDEO_PATH,
        name: 'Videos',
        component: Videos,
        exact: true,
        extraProps: {
            isLoggedIn: true,
            roles: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
        },
    },
];

export default route;
