import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '@redux/store';
import api from 'services/axios';
import { IUnknownObject } from '@interfaces/app';
import { adsSlice } from '.';
import { IAdsData } from '@interfaces/promotion';

export const resetAddAdsAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(adsSlice.actions.clear({ context: 'ads/add' }));
    };

const addAdsAction = createAsyncThunk(
    'ads/add',
    async (params: { data: IAdsData; isEdit: boolean }, { rejectWithValue }) => {
        const { data, isEdit } = params;
        try {
            const response: IUnknownObject = await api.request({
                data,
                method: isEdit ? 'PUT' : 'POST',
                url: `/admin/promotions/ads${isEdit ? `/${data.id}` : ''}`,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default addAdsAction;
