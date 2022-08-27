import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IVideoSharingState = {
    add: IBasicInitialState;
};

export const videoSharingInitialState: IVideoSharingState = {
    add: BasicInitialState,
};
