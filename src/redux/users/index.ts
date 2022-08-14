import { createSlice } from '@reduxjs/toolkit';
import getCurrentUserAction from './getCurrentUser';
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from 'constants/redux';
import { userInitialState } from './types';
import searchUsersAction from './search';
import getClientsAction from './getClients';
import blockUserAction from './block';
import unblockUserAction from './unblock';
import deleteUserAction from './delete';
import addUserAction from './add';

export const userSlice = createSlice({
    name: 'users',
    initialState: userInitialState,
    reducers: {
        clear: ActionWrapperReset,
        currentUser: ActionWrapperFulfilled,
    },
    extraReducers: (builder) => {
        builder
            // get the current user
            .addCase(getCurrentUserAction.pending, ActionWrapperPending)
            .addCase(getCurrentUserAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getCurrentUserAction.rejected, ActionWrapperRejected)
            // get all the users
            .addCase(searchUsersAction.pending, ActionWrapperPending)
            .addCase(searchUsersAction.fulfilled, ActionWrapperFulfilled)
            .addCase(searchUsersAction.rejected, ActionWrapperRejected)
            // get all the clients
            .addCase(getClientsAction.pending, ActionWrapperPending)
            .addCase(getClientsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getClientsAction.rejected, ActionWrapperRejected)
            // block user
            .addCase(blockUserAction.pending, ActionWrapperPending)
            .addCase(blockUserAction.fulfilled, ActionWrapperFulfilled)
            .addCase(blockUserAction.rejected, ActionWrapperRejected)
            // unblock user
            .addCase(unblockUserAction.pending, ActionWrapperPending)
            .addCase(unblockUserAction.fulfilled, ActionWrapperFulfilled)
            .addCase(unblockUserAction.rejected, ActionWrapperRejected)
            // delete
            .addCase(deleteUserAction.pending, ActionWrapperPending)
            .addCase(deleteUserAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deleteUserAction.rejected, ActionWrapperRejected)
            // create and update
            .addCase(addUserAction.pending, ActionWrapperPending)
            .addCase(addUserAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addUserAction.rejected, ActionWrapperRejected);
    },
});

const userReducer = userSlice.reducer;
export default userReducer;
