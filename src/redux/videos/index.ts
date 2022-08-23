import { createSlice } from '@reduxjs/toolkit';
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from 'constants/redux';
import addVideoAction from './add';
import addYoutubeVideoCommentAction from './addYoutubeVideoComment';
import approveVideoAction from './approve';
import deleteVideoAction from './delete';
import disableVideoAction from './disable';
import getAllVideosAction from './getAll';
import getVideoCategoriesAction from './getCategories';
import getYoutubeVideoCommentsAction from './getYoutubeVideoComment';
import getRelatedVideosAction from './related';
import getSingleVideoAction from './single';
import { videosInitialState } from './types';
import getYoutubeVideoInfoAction from './youtubeVideo';

export const videosSlice = createSlice({
    name: 'videos',
    initialState: videosInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // add a video
            .addCase(addVideoAction.pending, ActionWrapperPending)
            .addCase(addVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addVideoAction.rejected, ActionWrapperRejected)
            // get all videos
            .addCase(getAllVideosAction.pending, ActionWrapperPending)
            .addCase(getAllVideosAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllVideosAction.rejected, ActionWrapperRejected)
            // get video categories
            .addCase(getVideoCategoriesAction.pending, ActionWrapperPending)
            .addCase(getVideoCategoriesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getVideoCategoriesAction.rejected, ActionWrapperRejected)
            // approve
            .addCase(approveVideoAction.pending, ActionWrapperPending)
            .addCase(approveVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(approveVideoAction.rejected, ActionWrapperRejected)
            // disable
            .addCase(disableVideoAction.pending, ActionWrapperPending)
            .addCase(disableVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(disableVideoAction.rejected, ActionWrapperRejected)
            // delete
            .addCase(deleteVideoAction.pending, ActionWrapperPending)
            .addCase(deleteVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deleteVideoAction.rejected, ActionWrapperRejected)
            // get single video
            .addCase(getSingleVideoAction.pending, ActionWrapperPending)
            .addCase(getSingleVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getSingleVideoAction.rejected, ActionWrapperRejected)
            // get related videos
            .addCase(getRelatedVideosAction.pending, ActionWrapperPending)
            .addCase(getRelatedVideosAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getRelatedVideosAction.rejected, ActionWrapperRejected)
            // get single youtube video infos
            .addCase(getYoutubeVideoInfoAction.pending, ActionWrapperPending)
            .addCase(getYoutubeVideoInfoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getYoutubeVideoInfoAction.rejected, ActionWrapperRejected)
            // get comments from a youtube video
            .addCase(getYoutubeVideoCommentsAction.pending, ActionWrapperPending)
            .addCase(getYoutubeVideoCommentsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getYoutubeVideoCommentsAction.rejected, ActionWrapperRejected)
            // add comment to a youtube video
            .addCase(addYoutubeVideoCommentAction.pending, ActionWrapperPending)
            .addCase(addYoutubeVideoCommentAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addYoutubeVideoCommentAction.rejected, ActionWrapperRejected);
    },
});

const videosReducer = videosSlice.reducer;
export default videosReducer;
