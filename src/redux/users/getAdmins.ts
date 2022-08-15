import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

interface IParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    role?: string | null | undefined;
}

const getAdminsAction = createAsyncThunk('users/admins', async (params: IParams, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/admin/admins', {
            params,
        });
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAdminsAction;
