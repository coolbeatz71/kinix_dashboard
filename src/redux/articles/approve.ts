import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';
import { articlesSlice } from '.';

export const resetApproveArticleAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(articlesSlice.actions.clear({ context: 'articles/approve' }));
    };

const approveArticleAction = createAsyncThunk(
    'articles/approve',
    async (params: { password: string; slug: string }, { rejectWithValue }) => {
        const { password, slug } = params;

        try {
            const { data } = await api.put(`/admin/articles/approve/${slug}`, { password });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default approveArticleAction;
