import { BasicInitialState, IBasicInitialState } from '@constants/redux';

export type IAdsState = {
    add: IBasicInitialState;
    addPlan: IBasicInitialState;
    all: IBasicInitialState;
    plans: IBasicInitialState;
    enable: IBasicInitialState;
    disable: IBasicInitialState;
    delete: IBasicInitialState;
};

export const adsInitialState: IAdsState = {
    add: BasicInitialState,
    addPlan: BasicInitialState,
    all: BasicInitialState,
    plans: BasicInitialState,
    enable: BasicInitialState,
    disable: BasicInitialState,
    delete: BasicInitialState,
};
