import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IVideosState = {
    add: IBasicInitialState;
    all: IBasicInitialState;
    categories: IBasicInitialStateList;
    approve: IBasicInitialState;
    disable: IBasicInitialState;
    delete: IBasicInitialState;
    single: IBasicInitialState;
    related: IBasicInitialStateList;
    youtubeVideo: IBasicInitialState;
};

export const videosInitialState: IVideosState = {
    add: BasicInitialState,
    all: BasicInitialState,
    categories: BasicInitialStateList,
    approve: BasicInitialState,
    disable: BasicInitialState,
    delete: BasicInitialState,
    single: BasicInitialState,
    related: BasicInitialStateList,
    youtubeVideo: BasicInitialState,
};
