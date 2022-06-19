import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import overview from './overview';

export const rootReducer = combineReducers({
    auth,
    user,
    overview,
});

export type IRootState = ReturnType<typeof rootReducer>;
