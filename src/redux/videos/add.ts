import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '@redux/store';
import api from 'services/axios';
import { IUnknownObject } from '@interfaces/app';
import { IVideoData } from '@interfaces/videos';
import { videosSlice } from '.';

export const resetAddVideoAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(videosSlice.actions.clear({ context: 'videos/add' }));
    };

const addVideoAction = createAsyncThunk(
    'videos/add',
    async (params: { data: IVideoData; isEdit: boolean }, { rejectWithValue }) => {
        const { data, isEdit } = params;
        const { categoryId } = data;
        const formatData = isEdit ? data : { ...data, categoryId: (categoryId as IUnknownObject).value };
        try {
            const response: IUnknownObject = await api.request({
                data: formatData,
                method: isEdit ? 'PUT' : 'POST',
                url: `/admin/videos${isEdit ? `/${data.slug}` : ''}`,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default addVideoAction;
