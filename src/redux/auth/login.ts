import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginData } from '@interfaces/auth';
import api from 'services/axios';
import { authSlice } from './';
import { AppDispatch } from 'redux/store';
import { API_TOKEN } from '@constants/platform';
import { IUnknownObject } from '@interfaces/app';
import setCurrentUserAction from '@redux/users/setCurrentUser';
import { setLocalUserData } from '@helpers/getLocalUserData';

export const resetLoginAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/login' }));
    };

const loginAction = createAsyncThunk(
    'auth/login',
    async (params: { data: ILoginData; dispatch: AppDispatch }, { rejectWithValue }) => {
        const { data, dispatch } = params;
        try {
            const response: IUnknownObject = await api.post('/admin/auth', data);

            setLocalUserData(response.data);
            dispatch(setCurrentUserAction(response.data));
            localStorage.setItem(API_TOKEN, response.token);
            api.defaults.headers.Authorization = `Bearer ${response.token}`;

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default loginAction;
