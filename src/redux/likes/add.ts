import api from '@services/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const addArticleLikeAction = createAsyncThunk('likes/add', async (slug: string, { rejectWithValue }) => {
    try {
        const { data } = await api.post(`/likes/${slug}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default addArticleLikeAction;
