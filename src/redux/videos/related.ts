import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

export interface IParams {
    slug: string;
    tags: string[];
}

const getRelatedVideosAction = createAsyncThunk('videos/related', async (params: IParams, { rejectWithValue }) => {
    const { slug, tags } = params;
    try {
        const { data } = await api.get(`/videos/related/${slug}`, { params: { tags: tags?.join(',') } });
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getRelatedVideosAction;
