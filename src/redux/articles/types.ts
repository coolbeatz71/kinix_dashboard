import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IArticlesState = {
    add: IBasicInitialState;
    all: IBasicInitialState;
    delete: IBasicInitialState;
    single: IBasicInitialState;
    approve: IBasicInitialState;
    disable: IBasicInitialState;
    related: IBasicInitialStateList;
};

export const articlesInitialState: IArticlesState = {
    add: BasicInitialState,
    all: BasicInitialState,
    delete: BasicInitialState,
    single: BasicInitialState,
    approve: BasicInitialState,
    disable: BasicInitialState,
    related: BasicInitialStateList,
};
