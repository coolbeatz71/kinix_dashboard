import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

interface IParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    category?: string | null | undefined;
}

const getAllVideosAction = createAsyncThunk('videos/all', async (params: IParams, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/admin/videos', { params });
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllVideosAction;
