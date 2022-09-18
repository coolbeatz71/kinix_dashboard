import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';
import { articlesSlice } from '.';

export const resetFeatureArticleAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(articlesSlice.actions.clear({ context: 'articles/feature' }));
    };

const featureArticleAction = createAsyncThunk(
    'articles/feature',
    async (params: { password: string; slug: string }, { rejectWithValue }) => {
        const { password, slug } = params;

        try {
            const { data } = await api.put(`/admin/articles/feature/${slug}`, { password });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default featureArticleAction;
