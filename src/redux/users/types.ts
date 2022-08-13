import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IUserState = {
    clients: IBasicInitialState;
    search: IBasicInitialStateList;
    currentUser: IBasicInitialState;
};

export const userInitialState: IUserState = {
    clients: BasicInitialState,
    search: BasicInitialStateList,
    currentUser: BasicInitialState,
};
