import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

const searchUsersAction = createAsyncThunk('users/search', async (params: { search: string }, { rejectWithValue }) => {
    const { search } = params;
    try {
        const { data } = await api.get('/admin/users', {
            params: { search },
        });
        return data.rows;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default searchUsersAction;
