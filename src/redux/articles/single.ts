import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

const getSingleArticleAction = createAsyncThunk('articles/single', async (slug: string, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/articles/${slug}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getSingleArticleAction;
