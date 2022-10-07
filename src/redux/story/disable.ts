import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';
import { storySlice } from '.';

export const resetDisableStoryAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(storySlice.actions.clear({ context: 'story/disable' }));
    };

const disableStoryAction = createAsyncThunk(
    'story/disable',
    async (params: { password: string; id: number }, { rejectWithValue }) => {
        const { password, id } = params;

        try {
            const { data } = await api.put(`/admin/promotions/story/disable/${id}`, { password });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default disableStoryAction;
