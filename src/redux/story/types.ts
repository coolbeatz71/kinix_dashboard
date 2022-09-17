import { BasicInitialState, IBasicInitialState } from '@constants/redux';

export type IStoryState = {
    add: IBasicInitialState;
    addPlan: IBasicInitialState;
    all: IBasicInitialState;
    plans: IBasicInitialState;
    enable: IBasicInitialState;
    disable: IBasicInitialState;
    delete: IBasicInitialState;
    overview: IBasicInitialState;
};

export const storyInitialState: IStoryState = {
    add: BasicInitialState,
    addPlan: BasicInitialState,
    all: BasicInitialState,
    plans: BasicInitialState,
    enable: BasicInitialState,
    disable: BasicInitialState,
    delete: BasicInitialState,
    overview: BasicInitialState,
};
