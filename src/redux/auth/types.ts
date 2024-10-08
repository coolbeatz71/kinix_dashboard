import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IAuthState = {
    login: IBasicInitialState;
    logout: IBasicInitialState;
    updateAvatar: IBasicInitialState;
    updateAccount: IBasicInitialState;
    changePassword: IBasicInitialState;
};

export const authInitialState: IAuthState = {
    login: BasicInitialState,
    logout: BasicInitialState,
    updateAvatar: BasicInitialState,
    updateAccount: BasicInitialState,
    changePassword: BasicInitialState,
};
