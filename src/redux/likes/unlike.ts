import api from '@services/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const removeArticleLikeAction = createAsyncThunk('likes/unlike', async (slug: string, { rejectWithValue }) => {
    try {
        const { data } = await api.delete(`/likes/${slug}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default removeArticleLikeAction;
