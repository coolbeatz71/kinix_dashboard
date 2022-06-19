import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getOverviewAction = createAsyncThunk('overview/get', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/admin/overview');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getOverviewAction;
