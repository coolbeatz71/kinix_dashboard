import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';
import { adsSlice } from '.';

export const resetDeleteAdsAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(adsSlice.actions.clear({ context: 'ads/delete' }));
    };

const deleteAdsAction = createAsyncThunk(
    'ads/delete',
    async (params: { password: string; id: number }, { rejectWithValue }) => {
        const { password, id } = params;

        try {
            const { data } = await api.delete(`/admin/promotions/ads/${id}`, { data: { password } });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default deleteAdsAction;
