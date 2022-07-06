import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '@redux/store';
import api from 'services/axios';
import { IUnknownObject } from '@interfaces/app';
import { IArticleData } from '@interfaces/articles';
import { articlesSlice } from '.';

export const resetAddArticleAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(articlesSlice.actions.clear({ context: 'articles/add' }));
    };

const addArticleAction = createAsyncThunk(
    'articles/add',
    async (params: { data: IArticleData; isEdit: boolean }, { rejectWithValue }) => {
        const { data, isEdit } = params;
        try {
            const response: IUnknownObject = await api.request({
                data,
                method: isEdit ? 'PUT' : 'POST',
                url: `/admin/articles${isEdit ? `/${data.slug}` : ''}`,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default addArticleAction;
