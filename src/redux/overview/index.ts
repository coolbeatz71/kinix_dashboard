import { createSlice } from '@reduxjs/toolkit';
import getOverviewAction from './getOverview';
import { ActionWrapperFulfilled, ActionWrapperPending, ActionWrapperRejected } from 'constants/redux';
import { overviewInitialState } from './types';

export const overviewSlice = createSlice({
    name: 'overview',
    initialState: overviewInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOverviewAction.pending, ActionWrapperPending)
            .addCase(getOverviewAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getOverviewAction.rejected, ActionWrapperRejected);
    },
});

const overviewReducer = overviewSlice.reducer;
export default overviewReducer;
