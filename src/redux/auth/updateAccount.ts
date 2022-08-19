import api from 'services/axios';
import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { userSlice } from '../users';

interface IParams {
    email: string;
    userName: string;
    countryName: string;
    countryFlag: string;
    phonePartial: string;
    phoneISOCode: string;
    phoneDialCode: string;
}

export const resetUpdateAccountAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(userSlice.actions.clear({ context: 'auth/updateAccount' }));
    };

const updateAccountAction = createAsyncThunk('auth/updateAccount', async (params: IParams, { rejectWithValue }) => {
    try {
        const { data } = await api.put('/auth/update', params);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default updateAccountAction;
