import { createSlice } from '@reduxjs/toolkit';
import getCurrentUserAction from './getCurrentUser';
import { ActionWrapperFulfilled, ActionWrapperPending, ActionWrapperRejected } from 'constants/redux';
import { userInitialState } from './types';
import searchUsersAction from './searchUsers';
import getClientsAction from './getClients';

export const userSlice = createSlice({
    name: 'users',
    initialState: userInitialState,
    reducers: {
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
            .addCase(getClientsAction.rejected, ActionWrapperRejected);
    },
});

const userReducer = userSlice.reducer;
export default userReducer;
