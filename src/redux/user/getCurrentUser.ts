import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { verifyToken } from '@helpers/getToken';

const getCurrentUserAction = createAsyncThunk('user/currentUser', async (_, { rejectWithValue }) => {
    const isTokenValid = verifyToken();

    if (isTokenValid) {
        try {
            const { data } = await api.get('/auth/user');
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
});

export default getCurrentUserAction;
