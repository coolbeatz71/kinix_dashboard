import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

export interface IParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}

const getAllStoryAction = createAsyncThunk('story/all', async (params: IParams, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/admin/promotions/story', { params });
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllStoryAction;
