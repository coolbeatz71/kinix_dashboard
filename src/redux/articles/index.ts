import { createSlice } from '@reduxjs/toolkit';
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from 'constants/redux';
import addArticleAction from './add';
import approveArticleAction from './approve';
import deleteArticleAction from './delete';
import disableArticleAction from './disable';
import getAllArticlesAction from './getAll';
import getSingleArticleAction from './single';
import { articlesInitialState } from './types';

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: articlesInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // add an article
            .addCase(addArticleAction.pending, ActionWrapperPending)
            .addCase(addArticleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addArticleAction.rejected, ActionWrapperRejected)
            // get all articles
            .addCase(getAllArticlesAction.pending, ActionWrapperPending)
            .addCase(getAllArticlesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllArticlesAction.rejected, ActionWrapperRejected)
            // approve
            .addCase(approveArticleAction.pending, ActionWrapperPending)
            .addCase(approveArticleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(approveArticleAction.rejected, ActionWrapperRejected)
            // disable
            .addCase(disableArticleAction.pending, ActionWrapperPending)
            .addCase(disableArticleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(disableArticleAction.rejected, ActionWrapperRejected)
            // delete
            .addCase(deleteArticleAction.pending, ActionWrapperPending)
            .addCase(deleteArticleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deleteArticleAction.rejected, ActionWrapperRejected)
            // get single article
            .addCase(getSingleArticleAction.pending, ActionWrapperPending)
            .addCase(getSingleArticleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getSingleArticleAction.rejected, ActionWrapperRejected);
    },
});

const articlesReducer = articlesSlice.reducer;
export default articlesReducer;
