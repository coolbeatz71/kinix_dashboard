import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';
import { storySlice } from '.';

export const resetDeleteStoryAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(storySlice.actions.clear({ context: 'story/delete' }));
    };

const deleteStoryAction = createAsyncThunk(
    'story/delete',
    async (params: { password: string; id: number }, { rejectWithValue }) => {
        const { password, id } = params;

        try {
            const { data } = await api.delete(`/admin/promotions/story/${id}`, { data: { password } });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default deleteStoryAction;
