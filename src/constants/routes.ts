import login from '@views/Login/route';
import dashboard from '@views/Dashboard/route';
import articles from '@views/Articles/route';
import { IRoute } from '@interfaces/route';

const routes: IRoute[] = [...login, ...dashboard, ...articles];

export default routes;
