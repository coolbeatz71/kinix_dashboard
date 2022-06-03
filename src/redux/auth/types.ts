import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IAuthState = {
    login: IBasicInitialState;
    signup: IBasicInitialState;
};

export const authInitialState: IAuthState = {
    login: BasicInitialState,
    signup: BasicInitialState,
};
