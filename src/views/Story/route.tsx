import React from 'react';
import { STORY_PATH } from '@constants/paths';
import EnumRole from '@interfaces/role';

const Story = React.lazy(() => import('.'));

const route = [
    {
        path: STORY_PATH,
        name: 'Story',
        component: Story,
        exact: true,
        extraProps: {
            isLoggedIn: true,
            roles: [EnumRole.SUPER_ADMIN],
        },
    },
];

export default route;
