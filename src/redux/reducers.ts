import { combineReducers } from 'redux';

import auth from './auth';
import users from './users';
import likes from './likes';
import videos from './videos';
import overview from './overview';
import articles from './articles';
import comments from './comments';

export const rootReducer = combineReducers({
    auth,
    users,
    videos,
    overview,
    articles,
    comments,
    likes,
});

export type IRootState = ReturnType<typeof rootReducer>;
