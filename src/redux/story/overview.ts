import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

const getStoryOverviewAction = createAsyncThunk('story/overview', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/admin/overview/story');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getStoryOverviewAction;
