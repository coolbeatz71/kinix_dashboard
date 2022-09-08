import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { verifyToken } from '@helpers/getToken';

const getCurrentUserAction = createAsyncThunk('users/currentUser', async (_, { rejectWithValue }) => {
    const token = verifyToken();
    if (token) {
        try {
            const { data } = await api.get('/admin');
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
});

export default getCurrentUserAction;
