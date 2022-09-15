import {
    ActionWrapperReset,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperFulfilled,
} from '@constants/redux';
import { createSlice } from '@reduxjs/toolkit';
import addStoryAction from './add';
import addStoryPlanAction from './addPlan';
import deleteStoryAction from './delete';
import disableStoryAction from './disable';
import enableStoryAction from './enable';
import getAllStoryAction from './getAll';
import getStoryOverviewAction from './overview';
import getAllStoryPlanAction from './plans';
import { storyInitialState } from './types';

export const storySlice = createSlice({
    name: 'story',
    initialState: storyInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // add an story
            .addCase(addStoryAction.pending, ActionWrapperPending)
            .addCase(addStoryAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addStoryAction.rejected, ActionWrapperRejected)
            // get all story
            .addCase(getAllStoryAction.pending, ActionWrapperPending)
            .addCase(getAllStoryAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllStoryAction.rejected, ActionWrapperRejected)
            // get all story plan
            .addCase(getAllStoryPlanAction.pending, ActionWrapperPending)
            .addCase(getAllStoryPlanAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllStoryPlanAction.rejected, ActionWrapperRejected)
            // enable an story
            .addCase(enableStoryAction.pending, ActionWrapperPending)
            .addCase(enableStoryAction.fulfilled, ActionWrapperFulfilled)
            .addCase(enableStoryAction.rejected, ActionWrapperRejected)
            // delete an story
            .addCase(deleteStoryAction.pending, ActionWrapperPending)
            .addCase(deleteStoryAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deleteStoryAction.rejected, ActionWrapperRejected)
            // disable an story
            .addCase(disableStoryAction.pending, ActionWrapperPending)
            .addCase(disableStoryAction.fulfilled, ActionWrapperFulfilled)
            .addCase(disableStoryAction.rejected, ActionWrapperRejected)
            // add an story plan
            .addCase(addStoryPlanAction.pending, ActionWrapperPending)
            .addCase(addStoryPlanAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addStoryPlanAction.rejected, ActionWrapperRejected)
            // get story overview
            .addCase(getStoryOverviewAction.pending, ActionWrapperPending)
            .addCase(getStoryOverviewAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getStoryOverviewAction.rejected, ActionWrapperRejected);
    },
});

const storyReducer = storySlice.reducer;
export default storyReducer;
