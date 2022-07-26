import { createSlice } from '@reduxjs/toolkit';
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from 'constants/redux';
import addArticleAction from './add';
import getAllArticlesAction from './getAll';
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
            .addCase(getAllArticlesAction.rejected, ActionWrapperRejected);
    },
});

const articlesReducer = articlesSlice.reducer;
export default articlesReducer;
