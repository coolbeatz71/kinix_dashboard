import { FC, useEffect, useMemo } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import nprogress from 'nprogress';

const FancyRoute: FC<RouteProps> = (props) => {
    useMemo(() => {
        nprogress.start();
    }, []);

    useEffect(() => {
        nprogress.done();
    }, []);

    return <Route {...props} />;
};

export default FancyRoute;
