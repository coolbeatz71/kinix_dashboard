import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

const getSingleVideoAction = createAsyncThunk('videos/single', async (slug: string, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/videos/${slug}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getSingleVideoAction;
