import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IVideosState = {
    add: IBasicInitialState;
};

export const videosInitialState: IVideosState = {
    add: BasicInitialState,
};
