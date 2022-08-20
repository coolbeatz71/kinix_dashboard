import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IArticlesState = {
    add: IBasicInitialState;
    all: IBasicInitialState;
    approve: IBasicInitialState;
    disable: IBasicInitialState;
    delete: IBasicInitialState;
    single: IBasicInitialState;
};

export const articlesInitialState: IArticlesState = {
    add: BasicInitialState,
    all: BasicInitialState,
    approve: BasicInitialState,
    disable: BasicInitialState,
    delete: BasicInitialState,
    single: BasicInitialState,
};
