import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';
import { articlesSlice } from '.';

export const resetUnFeatureArticleAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(articlesSlice.actions.clear({ context: 'articles/unfeature' }));
    };

const unfeatureArticleAction = createAsyncThunk(
    'articles/unfeature',
    async (params: { password: string; slug: string }, { rejectWithValue }) => {
        const { password, slug } = params;

        try {
            const { data } = await api.put(`/admin/articles/unfeature/${slug}`, { password });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default unfeatureArticleAction;
