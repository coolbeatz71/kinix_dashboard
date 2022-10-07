import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';
import { adsSlice } from '.';

export const resetDisableAdsAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(adsSlice.actions.clear({ context: 'ads/disable' }));
    };

const disableAdsAction = createAsyncThunk(
    'ads/disable',
    async (params: { password: string; id: number }, { rejectWithValue }) => {
        const { password, id } = params;

        try {
            const { data } = await api.put(`/admin/promotions/ads/disable/${id}`, { password });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default disableAdsAction;
