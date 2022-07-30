import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IArticlesState = {
    add: IBasicInitialState;
    all: IBasicInitialState;
};

export const articlesInitialState: IArticlesState = {
    add: BasicInitialState,
    all: BasicInitialState,
};
