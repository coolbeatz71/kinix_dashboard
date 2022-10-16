import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

const getAllAdsPlanAction = createAsyncThunk('ads/plans', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/promotions/plan/pubs');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllAdsPlanAction;
