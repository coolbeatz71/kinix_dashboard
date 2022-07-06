import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import overview from './overview';
import articles from './articles';

export const rootReducer = combineReducers({
    auth,
    user,
    overview,
    articles,
});

export type IRootState = ReturnType<typeof rootReducer>;
