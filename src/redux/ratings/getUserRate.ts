import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getSingleVideoRatedByUserAction = createAsyncThunk(
    'ratings/userRate',
    async (slug: string, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/rates/user/${slug}`);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default getSingleVideoRatedByUserAction;
