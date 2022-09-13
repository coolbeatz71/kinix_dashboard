import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from '@constants/redux';
import { createSlice } from '@reduxjs/toolkit';
import addAdsAction from './add';
import addAdsPlanAction from './addPlan';
import deleteAdsAction from './delete';
import disableAdsAction from './disable';
import enableAdsAction from './enable';
import getAllAdsAction from './getAll';
import getAllAdsPlanAction from './plans';
import { adsInitialState } from './types';

export const adsSlice = createSlice({
    name: 'ads',
    initialState: adsInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // add an ads
            .addCase(addAdsAction.pending, ActionWrapperPending)
            .addCase(addAdsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addAdsAction.rejected, ActionWrapperRejected)
            // get all ads
            .addCase(getAllAdsAction.pending, ActionWrapperPending)
            .addCase(getAllAdsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllAdsAction.rejected, ActionWrapperRejected)
            // get all ads plan
            .addCase(getAllAdsPlanAction.pending, ActionWrapperPending)
            .addCase(getAllAdsPlanAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllAdsPlanAction.rejected, ActionWrapperRejected)
            // enable an ads
            .addCase(enableAdsAction.pending, ActionWrapperPending)
            .addCase(enableAdsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(enableAdsAction.rejected, ActionWrapperRejected)
            // delete an ads
            .addCase(deleteAdsAction.pending, ActionWrapperPending)
            .addCase(deleteAdsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deleteAdsAction.rejected, ActionWrapperRejected)
            // disable an ads
            .addCase(disableAdsAction.pending, ActionWrapperPending)
            .addCase(disableAdsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(disableAdsAction.rejected, ActionWrapperRejected)
            // add an ads plan
            .addCase(addAdsPlanAction.pending, ActionWrapperPending)
            .addCase(addAdsPlanAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addAdsPlanAction.rejected, ActionWrapperRejected);
    },
});

const adsReducer = adsSlice.reducer;
export default adsReducer;
