import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '@redux/store';
import api from 'services/axios';
import { IUnknownObject } from '@interfaces/app';
import { sharingSlice } from '.';

export const resetAddVideoSharingAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(sharingSlice.actions.clear({ context: 'sharings/add' }));
    };

const addVideoSharingAction = createAsyncThunk('sharings/add', async (slug: string, { rejectWithValue }) => {
    try {
        const { data }: IUnknownObject = await api.post(`/shares/${slug}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default addVideoSharingAction;
