import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IAuthState = {
    login: IBasicInitialState;
    logout: IBasicInitialState;
};

export const authInitialState: IAuthState = {
    login: BasicInitialState,
    logout: BasicInitialState,
};
