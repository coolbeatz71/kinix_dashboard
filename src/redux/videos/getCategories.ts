import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

const getVideoCategoriesAction = createAsyncThunk('videos/categories', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/videos/categories');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getVideoCategoriesAction;
