import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { AppDispatch } from '@redux/store';
import { IUnknownObject } from '@interfaces/app';
import { IStoryPlanData } from '@interfaces/promotion';
import { storySlice } from '.';

export const resetAddStoryPlanAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(storySlice.actions.clear({ context: 'story/addPlan' }));
    };

const addStoryPlanAction = createAsyncThunk(
    'story/addPlan',
    async (params: { data: IStoryPlanData; isEdit: boolean }, { rejectWithValue }) => {
        const { data, isEdit } = params;
        const { name, price, duration } = data;
        try {
            const response: IUnknownObject = await api.request({
                data: {
                    name,
                    price: Number(price),
                    duration: Number(duration),
                },
                method: isEdit ? 'PUT' : 'POST',
                url: `/admin/promotions/plan/story${isEdit ? `/${data.id}` : ''}`,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default addStoryPlanAction;
