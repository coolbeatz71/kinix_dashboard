import React, { Suspense, useEffect } from 'react';
import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LOGIN_PATH, NOT_FOUND_PATH } from '@constants/paths';
import PageComponent from '@components/layout/PageComponent';
import Page404 from '@views/Page404';
import ScreenSkeleton from '@components/skeleton/Screen';

const App = (): JSX.Element => {
    useEffect(() => {
        dayjs.locale(fr);
        dayjs.extend(relativeTime);
    }, []);

    return (
        <BrowserRouter>
            <Suspense fallback={<ScreenSkeleton />}>
                <Switch>
                    <Route exact path={NOT_FOUND_PATH} render={(props) => <Page404 {...props} />} />
                    <Route path={LOGIN_PATH} render={() => <PageComponent />} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
