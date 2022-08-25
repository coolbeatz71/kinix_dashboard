import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

const getArticleLikesAction = createAsyncThunk('likes/all', async (slug: string, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/likes/${slug}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getArticleLikesAction;
