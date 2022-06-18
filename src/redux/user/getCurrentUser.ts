import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { isTokenExpired, verifyToken } from '@helpers/getToken';
import getLocalUserData from '@helpers/getLocalUserData';

const getCurrentUserAction = createAsyncThunk('user/currentUser', async (_, { rejectWithValue }) => {
    const token = verifyToken();
    const isExpired = isTokenExpired();
    if (!isExpired) {
        const user = getLocalUserData();
        return user;
    } else if (token) {
        try {
            const { data } = await api.get('/admin');
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
});

export default getCurrentUserAction;
