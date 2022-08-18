import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IUserState = {
    add: IBasicInitialState;
    admins: IBasicInitialState;
    clients: IBasicInitialState;
    search: IBasicInitialStateList;
    currentUser: IBasicInitialState;
    updateAvatar: IBasicInitialState;
    block: IBasicInitialState;
    unblock: IBasicInitialState;
    delete: IBasicInitialState;
};

export const userInitialState: IUserState = {
    add: BasicInitialState,
    admins: BasicInitialState,
    clients: BasicInitialState,
    search: BasicInitialStateList,
    currentUser: BasicInitialState,
    updateAvatar: BasicInitialState,
    block: BasicInitialState,
    unblock: BasicInitialState,
    delete: BasicInitialState,
};
