import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import videos from './videos';
import overview from './overview';
import articles from './articles';

export const rootReducer = combineReducers({
    auth,
    user,
    videos,
    overview,
    articles,
});

export type IRootState = ReturnType<typeof rootReducer>;
