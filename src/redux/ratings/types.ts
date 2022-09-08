import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IVideoRatingState = {
    add: IBasicInitialState;
    userRate: IBasicInitialStateList;
};

export const videoRatingInitialState: IVideoRatingState = {
    add: BasicInitialState,
    userRate: BasicInitialStateList,
};
