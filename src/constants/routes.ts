import login from '@views/Login/route';
import dashboard from '@views/Dashboard/route';
import { IRoute } from '@interfaces/route';

const routes: IRoute[] = [...login, ...dashboard];

export default routes;
