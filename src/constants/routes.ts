import { IRoute } from '@interfaces/route';

import login from '@views/Login/route';
import dashboard from '@views/Dashboard/route';
import articles from '@views/Articles/route';
import videos from '@views/Videos/route';
import users from '@views/Users/route';
import admins from '@views/Admins/route';
import settings from '@views/Settings/route';
import ads from '@views/Ads/route';
import stories from '@views/Story/route';

const routes: IRoute[] = [
    ...login,
    ...dashboard,
    ...articles,
    ...videos,
    ...users,
    ...admins,
    ...settings,
    ...ads,
    ...stories,
];

export default routes;
