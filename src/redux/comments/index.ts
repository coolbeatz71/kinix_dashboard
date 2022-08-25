import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from '@constants/redux';
import { createSlice } from '@reduxjs/toolkit';
import addArticleCommentAction from './add';
import deleteArticleCommentAction from './delete';
import getAllArticleCommentsAction from './getAll';
import { commentsInitialState } from './types';

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: commentsInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // add a comment to an article
            .addCase(addArticleCommentAction.pending, ActionWrapperPending)
            .addCase(addArticleCommentAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addArticleCommentAction.rejected, ActionWrapperRejected)
            // get all comments for an article
            .addCase(getAllArticleCommentsAction.pending, ActionWrapperPending)
            .addCase(getAllArticleCommentsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllArticleCommentsAction.rejected, ActionWrapperRejected)
            // delete an article comment
            .addCase(deleteArticleCommentAction.pending, ActionWrapperPending)
            .addCase(deleteArticleCommentAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deleteArticleCommentAction.rejected, ActionWrapperRejected);
    },
});

const commentsReducer = commentsSlice.reducer;
export default commentsReducer;
