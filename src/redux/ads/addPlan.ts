import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '@redux/store';
import api from 'services/axios';
import { IUnknownObject } from '@interfaces/app';
import { adsSlice } from '.';
import { IAdsPlanData } from '@interfaces/promotion';

export const resetAddAdsPlanAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(adsSlice.actions.clear({ context: 'ads/addPlan' }));
    };

const addAdsPlanAction = createAsyncThunk(
    'ads/addPlan',
    async (params: { data: IAdsPlanData; isEdit: boolean }, { rejectWithValue }) => {
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
                url: `/admin/promotions/plan/pubs${isEdit ? `/${data.id}` : ''}`,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default addAdsPlanAction;
