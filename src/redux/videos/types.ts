import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IVideosState = {
    add: IBasicInitialState;
    categories: IBasicInitialStateList;
};

export const videosInitialState: IVideosState = {
    add: BasicInitialState,
    categories: BasicInitialStateList,
};
