import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '@redux/store';
import api from 'services/axios';
import { IUnknownObject } from '@interfaces/app';
import { ratingsSlice } from '.';

interface IParams {
    slug: string;
    count: number;
}

export const resetAddVideoRatingAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(ratingsSlice.actions.clear({ context: 'ratings/add' }));
    };

const addVideoRatingAction = createAsyncThunk('ratings/add', async (params: IParams, { rejectWithValue }) => {
    const { count, slug } = params;
    try {
        const { data }: IUnknownObject = await api.post(`rates/${slug}`, {
            count,
        });
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default addVideoRatingAction;
