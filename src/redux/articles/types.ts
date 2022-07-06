import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IArticlesState = {
    add: IBasicInitialState;
};

export const articlesInitialState: IArticlesState = {
    add: BasicInitialState,
};
