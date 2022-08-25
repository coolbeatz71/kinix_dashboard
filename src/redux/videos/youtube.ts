import getVideoId from 'get-video-id';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getYoutubeVideoInfo } from '@services/youtube';

const getYoutubeVideoAction = createAsyncThunk('videos/youtube', async (link: string, { rejectWithValue }) => {
    const { id } = getVideoId(link);
    try {
        const video = await getYoutubeVideoInfo(id);
        return video;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getYoutubeVideoAction;
