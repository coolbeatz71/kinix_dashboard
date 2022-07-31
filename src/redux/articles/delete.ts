import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';
import { articlesSlice } from '.';

export const resetApproveArticleAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(articlesSlice.actions.clear({ context: 'articles/delete' }));
    };

const deleteArticleAction = createAsyncThunk(
    'articles/delete',
    async (params: { password: string; slug: string }, { rejectWithValue }) => {
        const { password, slug } = params;

        try {
            const { data } = await api.delete(`/admin/articles/${slug}`, { data: { password } });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default deleteArticleAction;
