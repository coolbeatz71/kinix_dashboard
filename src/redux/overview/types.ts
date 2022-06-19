import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IOverviewState = {
    get: IBasicInitialState;
};

export const overviewInitialState: IOverviewState = {
    get: BasicInitialState,
};
