import { ARTICLE_PATH } from '@constants/paths';
import EnumRole from '@interfaces/userRole';
import Articles from '.';

const route = [
    {
        path: ARTICLE_PATH,
        name: 'Articles',
        component: Articles,
        exact: true,
        extraProps: {
            isLoggedIn: true,
            roles: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
        },
    },
];

export default route;
