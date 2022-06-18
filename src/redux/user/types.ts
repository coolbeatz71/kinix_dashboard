import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IUserState = {
    currentUser: IBasicInitialState;
};

export const userInitialState: IUserState = {
    currentUser: BasicInitialState,
};
