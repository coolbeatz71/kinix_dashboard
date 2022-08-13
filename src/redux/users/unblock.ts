import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';
import { userSlice } from '.';

export const resetUnblockUserAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(userSlice.actions.clear({ context: 'users/unblock' }));
    };

const unblockUserAction = createAsyncThunk(
    'users/unblock',
    async (params: { password: string; id: number }, { rejectWithValue }) => {
        const { password, id } = params;

        try {
            const { data } = await api.put(`/admin/users/unblock/${id}`, { password });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default unblockUserAction;
