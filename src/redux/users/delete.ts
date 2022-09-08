import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';
import { userSlice } from '.';

export const resetDeleteUserAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(userSlice.actions.clear({ context: 'users/delete' }));
    };

const deleteUserAction = createAsyncThunk(
    'users/delete',
    async (params: { password: string; id: number }, { rejectWithValue }) => {
        const { password, id } = params;

        try {
            const { data } = await api.delete(`/admin/users/${id}`, { data: { password } });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default deleteUserAction;
