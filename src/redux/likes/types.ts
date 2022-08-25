import { IBasicInitialState, BasicInitialState } from '@constants/redux';

export type ILikesState = {
    add: IBasicInitialState;
    all: IBasicInitialState;
    unlike: IBasicInitialState;
};

export const likesInitialState: ILikesState = {
    add: BasicInitialState,
    all: BasicInitialState,
    unlike: BasicInitialState,
};
