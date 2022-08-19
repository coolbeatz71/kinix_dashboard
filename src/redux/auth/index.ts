import { createSlice } from '@reduxjs/toolkit';
import loginAction from './login';
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from 'constants/redux';
import { authInitialState } from './types';
import logoutAction from './logout';
import updateAvatarAction from './updateAvatar';
import changePasswordAction from './changePassword';

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginAction.pending, ActionWrapperPending)
            .addCase(loginAction.fulfilled, ActionWrapperFulfilled)
            .addCase(loginAction.rejected, ActionWrapperRejected)
            // logout
            .addCase(logoutAction.pending, ActionWrapperPending)
            .addCase(logoutAction.fulfilled, ActionWrapperFulfilled)
            .addCase(logoutAction.rejected, ActionWrapperRejected)
            // update avatar
            .addCase(updateAvatarAction.pending, ActionWrapperPending)
            .addCase(updateAvatarAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateAvatarAction.rejected, ActionWrapperRejected)
            // change password
            .addCase(changePasswordAction.pending, ActionWrapperPending)
            .addCase(changePasswordAction.fulfilled, ActionWrapperFulfilled)
            .addCase(changePasswordAction.rejected, ActionWrapperRejected);
    },
});

const authReducer = authSlice.reducer;
export default authReducer;
