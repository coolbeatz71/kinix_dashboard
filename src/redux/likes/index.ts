import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from '@constants/redux';
import { createSlice } from '@reduxjs/toolkit';
import addArticleLikeAction from './add';
import getArticleLikesAction from './getAll';
import { likesInitialState } from './types';
import removeArticleLikeAction from './unlike';

export const likesSlice = createSlice({
    name: 'likes',
    initialState: likesInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // like an article
            .addCase(addArticleLikeAction.pending, ActionWrapperPending)
            .addCase(addArticleLikeAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addArticleLikeAction.rejected, ActionWrapperRejected)
            // unlike an article
            .addCase(removeArticleLikeAction.pending, ActionWrapperPending)
            .addCase(removeArticleLikeAction.fulfilled, ActionWrapperFulfilled)
            .addCase(removeArticleLikeAction.rejected, ActionWrapperRejected)
            // get all likes for an article
            .addCase(getArticleLikesAction.pending, ActionWrapperPending)
            .addCase(getArticleLikesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getArticleLikesAction.rejected, ActionWrapperRejected);
    },
});

const likesReducer = likesSlice.reducer;
export default likesReducer;
