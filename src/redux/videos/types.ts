import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IVideosState = {
    add: IBasicInitialState;
    categories: IBasicInitialStateList;
    approve: IBasicInitialState;
    disable: IBasicInitialState;
    delete: IBasicInitialState;
};

export const videosInitialState: IVideosState = {
    add: BasicInitialState,
    categories: BasicInitialStateList,
    approve: BasicInitialState,
    disable: BasicInitialState,
    delete: BasicInitialState,
};
