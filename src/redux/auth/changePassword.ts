import api from 'services/axios';
import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { userSlice } from '../users';

interface IParams {
    oldPassword: string;
    newPassword: string;
}

export const resetChangePasswordAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(userSlice.actions.clear({ context: 'auth/changePassword' }));
    };

const changePasswordAction = createAsyncThunk('auth/changePassword', async (params: IParams, { rejectWithValue }) => {
    try {
        const { data } = await api.put('/auth/update/password', params);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default changePasswordAction;
