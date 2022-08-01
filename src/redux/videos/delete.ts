import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';
import { videosSlice } from '.';

export const resetDeleteVideoAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(videosSlice.actions.clear({ context: 'videos/delete' }));
    };

const deleteVideoAction = createAsyncThunk(
    'videos/delete',
    async (params: { password: string; slug: string }, { rejectWithValue }) => {
        const { password, slug } = params;

        try {
            const { data } = await api.delete(`/admin/videos/${slug}`, { data: { password } });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default deleteVideoAction;
