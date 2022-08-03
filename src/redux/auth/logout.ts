import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { AppDispatch, persistor } from 'redux/store';
import { API_TOKEN, USER_DATA } from '@constants/platform';
import { IUnknownObject } from '@interfaces/app';
import { authSlice } from '.';

const logoutAction = createAsyncThunk('auth/logout', async (params: { dispatch: AppDispatch }, { rejectWithValue }) => {
    const { dispatch } = params;
    try {
        const response: IUnknownObject = await api.delete('/admin/signout');

        dispatch(authSlice.actions.clear({ context: 'auth/login' }));
        dispatch(authSlice.actions.clear({ context: 'auth/logout' }));
        dispatch(authSlice.actions.clear({ context: 'auth/user' }));

        persistor.purge();
        localStorage.removeItem(USER_DATA);
        localStorage.removeItem(API_TOKEN);

        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default logoutAction;
