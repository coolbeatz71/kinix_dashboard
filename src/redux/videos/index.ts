import { createSlice } from '@reduxjs/toolkit';
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from 'constants/redux';
import addVideoAction from './add';
import getVideoCategoriesAction from './getCategories';
import { videosInitialState } from './types';

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
            // get video categories
            .addCase(getVideoCategoriesAction.pending, ActionWrapperPending)
            .addCase(getVideoCategoriesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getVideoCategoriesAction.rejected, ActionWrapperRejected);
    },
});

const videosReducer = videosSlice.reducer;
export default videosReducer;
