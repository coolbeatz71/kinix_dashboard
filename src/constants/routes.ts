import { IRoute } from '@interfaces/route';

import login from '@views/Login/route';
import dashboard from '@views/Dashboard/route';
import articles from '@views/Articles/route';
import videos from '@views/Videos/route';

const routes: IRoute[] = [...login, ...dashboard, ...articles, ...videos];

export default routes;
