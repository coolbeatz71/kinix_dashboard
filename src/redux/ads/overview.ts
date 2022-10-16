import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

const getAdsOverviewAction = createAsyncThunk('ads/overview', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/admin/overview/pubs');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAdsOverviewAction;
