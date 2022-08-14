import { IRoute } from '@interfaces/route';

import login from '@views/Login/route';
import dashboard from '@views/Dashboard/route';
import articles from '@views/Articles/route';
import videos from '@views/Videos/route';
import users from '@views/Users/route';

const routes: IRoute[] = [...login, ...dashboard, ...articles, ...videos, ...users];

export default routes;
