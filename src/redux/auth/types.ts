import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IAuthState = {
    login: IBasicInitialState;
};

export const authInitialState: IAuthState = {
    login: BasicInitialState,
};
