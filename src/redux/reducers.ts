import { combineReducers } from 'redux';

import auth from './auth';
import users from './users';
import videos from './videos';
import overview from './overview';
import articles from './articles';

export const rootReducer = combineReducers({
    auth,
    users,
    videos,
    overview,
    articles,
});

export type IRootState = ReturnType<typeof rootReducer>;
