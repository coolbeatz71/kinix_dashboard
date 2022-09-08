import { createSlice } from '@reduxjs/toolkit';
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from '@constants/redux';
import addVideoRatingAction from './add';
import { videoRatingInitialState } from './types';
import getSingleVideoRatedByUserAction from './getUserRate';

export const ratingsSlice = createSlice({
    name: 'ratings',
    initialState: videoRatingInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // add ratings to a video
            .addCase(addVideoRatingAction.pending, ActionWrapperPending)
            .addCase(addVideoRatingAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addVideoRatingAction.rejected, ActionWrapperRejected)
            // get ratings by an user for a specific video
            .addCase(getSingleVideoRatedByUserAction.pending, ActionWrapperPending)
            .addCase(getSingleVideoRatedByUserAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getSingleVideoRatedByUserAction.rejected, ActionWrapperRejected);
    },
});

const ratingsReducer = ratingsSlice.reducer;
export default ratingsReducer;
