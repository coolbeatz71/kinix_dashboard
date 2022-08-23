import getVideoId from 'get-video-id';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createYoutubeVideoComment } from '@services/youtube';

interface IParams {
    link: string;
    comment: string;
}

const addYoutubeVideoCommentAction = createAsyncThunk(
    'videos/addYoutubeVideoComment',
    async (params: IParams, { rejectWithValue }) => {
        const { link, comment } = params;
        const { id } = getVideoId(link);
        try {
            const video = await createYoutubeVideoComment(id, comment);
            return video;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default addYoutubeVideoCommentAction;
