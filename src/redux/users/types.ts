import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IUserState = {
    add: IBasicInitialState;
    clients: IBasicInitialState;
    search: IBasicInitialStateList;
    currentUser: IBasicInitialState;
    block: IBasicInitialState;
    unblock: IBasicInitialState;
    delete: IBasicInitialState;
};

export const userInitialState: IUserState = {
    add: BasicInitialState,
    clients: BasicInitialState,
    search: BasicInitialStateList,
    currentUser: BasicInitialState,
    block: BasicInitialState,
    unblock: BasicInitialState,
    delete: BasicInitialState,
};
