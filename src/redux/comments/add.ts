import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '@redux/store';
import api from 'services/axios';
import { IUnknownObject } from '@interfaces/app';
import { ICommentData } from '@interfaces/comments';
import { commentsSlice } from '.';

export const resetAddCommentAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(commentsSlice.actions.clear({ context: 'comments/add' }));
    };

const addArticleCommentAction = createAsyncThunk(
    'comments/add',
    async (params: { data: ICommentData; isEdit: boolean }, { rejectWithValue }) => {
        const { data, isEdit } = params;
        try {
            const response: IUnknownObject = await api.request({
                data,
                method: isEdit ? 'PUT' : 'POST',
                url: `/comments${isEdit ? `/${data.slug}/${data.id}` : `/${data.slug}`}`,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default addArticleCommentAction;
