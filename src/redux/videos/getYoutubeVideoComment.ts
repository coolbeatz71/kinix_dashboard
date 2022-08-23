import getVideoId from 'get-video-id';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getYoutubeVideoComments } from '@services/youtube';

const getYoutubeVideoCommentsAction = createAsyncThunk(
    'videos/youtubeVideoComments',
    async (link: string, { rejectWithValue }) => {
        const { id } = getVideoId(link);
        try {
            const video = await getYoutubeVideoComments(id);
            return video;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default getYoutubeVideoCommentsAction;
