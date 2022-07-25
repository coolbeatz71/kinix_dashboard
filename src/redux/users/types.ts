import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IUserState = {
    search: IBasicInitialStateList;
    currentUser: IBasicInitialState;
};

export const userInitialState: IUserState = {
    search: BasicInitialStateList,
    currentUser: BasicInitialState,
};
