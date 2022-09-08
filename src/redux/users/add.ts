import api from 'services/axios';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '@redux/store';
import { IUnknownObject } from '@interfaces/app';
import { userSlice } from '.';
import { IUserData } from '@interfaces/users';

export const resetAddUserAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(userSlice.actions.clear({ context: 'users/add' }));
    };

const addUserAction = createAsyncThunk(
    'users/add',
    async (params: { data: IUserData; isEdit: boolean }, { rejectWithValue }) => {
        const { data, isEdit } = params;

        try {
            const response: IUnknownObject = await api.request({
                data,
                method: isEdit ? 'PUT' : 'POST',
                url: `/admin/users${isEdit ? `/${data.id}` : ''}`,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default addUserAction;
