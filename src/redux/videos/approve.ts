import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';
import { videosSlice } from '.';

export const resetApproveVideoAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(videosSlice.actions.clear({ context: 'videos/approve' }));
    };

const approveVideoAction = createAsyncThunk(
    'videos/approve',
    async (params: { password: string; slug: string }, { rejectWithValue }) => {
        const { password, slug } = params;

        try {
            const { data } = await api.put(`/admin/videos/approve/${slug}`, { password });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default approveVideoAction;
