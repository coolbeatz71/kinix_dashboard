import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

const getAllStoryPlanAction = createAsyncThunk('story/plans', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/promotions/plan/story');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllStoryPlanAction;
