import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginData } from '@interfaces/auth';
import api from 'services/axios';
import { authSlice } from './';
import { AppDispatch } from 'redux/store';

export const resetLoginAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/login' }));
    };

const loginAction = createAsyncThunk('auth/login', async (params: ILoginData, { rejectWithValue }) => {
    try {
        const { data } = await api.post('/admin/auth', params);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default loginAction;
