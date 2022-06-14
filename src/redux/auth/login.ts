import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginData } from '@interfaces/auth';
import api from 'services/axios';
import { authSlice } from './';
import { AppDispatch } from 'redux/store';
import { API_TOKEN, USER_DATA } from '@constants/platform';
import { IUnknownObject } from '@interfaces/app';

export const resetLoginAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/login' }));
    };

const loginAction = createAsyncThunk('auth/login', async (params: ILoginData, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.post('/admin/auth', params);

        // set default authorization header
        api.defaults.headers.Authorization = response.token;

        // save user data
        const userData = JSON.stringify(response.data);

        localStorage.setItem(API_TOKEN, response.token);
        localStorage.setItem(USER_DATA, userData);

        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default loginAction;
