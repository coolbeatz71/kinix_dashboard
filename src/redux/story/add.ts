import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { AppDispatch } from '@redux/store';
import { IUnknownObject } from '@interfaces/app';
import { IStoryData } from '@interfaces/promotion';
import { storySlice } from '.';

export const resetAddStoryAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(storySlice.actions.clear({ context: 'story/add' }));
    };

const addStoryAction = createAsyncThunk(
    'story/add',
    async (params: { data: IStoryData; isEdit: boolean }, { rejectWithValue }) => {
        const { data, isEdit } = params;
        try {
            const response: IUnknownObject = await api.request({
                data,
                method: isEdit ? 'PUT' : 'POST',
                url: `/admin/promotions/story${isEdit ? `/${data.id}` : ''}`,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default addStoryAction;
