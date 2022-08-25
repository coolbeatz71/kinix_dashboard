import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type ICommentsState = {
    all: IBasicInitialState;
    add: IBasicInitialState;
    delete: IBasicInitialState;
};

export const commentsInitialState: ICommentsState = {
    all: BasicInitialState,
    add: BasicInitialState,
    delete: BasicInitialState,
};
