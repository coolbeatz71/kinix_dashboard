import { createSlice } from '@reduxjs/toolkit';
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from '@constants/redux';
import { videoSharingInitialState } from './types';
import addVideoSharingAction from './add';

export const sharingSlice = createSlice({
    name: 'sharings',
    initialState: videoSharingInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // save a video share
            .addCase(addVideoSharingAction.pending, ActionWrapperPending)
            .addCase(addVideoSharingAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addVideoSharingAction.rejected, ActionWrapperRejected);
    },
});

const sharingReducer = sharingSlice.reducer;
export default sharingReducer;
