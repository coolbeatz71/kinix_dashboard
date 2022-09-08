import { IUnknownObject } from '@interfaces/app';
import { PayloadAction } from '@reduxjs/toolkit';

export type IBasicInitialState = {
    data: IUnknownObject;
    loading: boolean;
    fetched: boolean;
    error: Error | IUnknownObject | null;
};

export type IBasicInitialStateList = {
    data: IUnknownObject[];
    loading: false;
    fetched: false;
    error: Error | null;
};

export const BasicInitialState: IBasicInitialState = {
    data: {},
    loading: false,
    fetched: false,
    error: null,
};

export const BasicInitialStateList: IBasicInitialStateList = {
    data: [],
    loading: false,
    fetched: false,
    error: null,
};

export const BasicActionPending = (state: IBasicInitialState): void => {
    state.error = null;
    state.loading = true;
    state.fetched = false;
};

export const BasicActionFulfilled = (state: IBasicInitialState, action: PayloadAction<IUnknownObject>): void => {
    state.error = null;
    state.fetched = true;
    state.loading = false;
    state.data = action.payload;
};

export const BasicActionRejected = (state: IBasicInitialState, action: PayloadAction<IUnknownObject>): void => {
    state.loading = false;
    state.fetched = false;
    state.error = action.payload;
};

export const BasicResetAction = (state: IBasicInitialState): void => {
    state.error = null;
    state.fetched = false;
    state.loading = false;
    state.data = {};
};

export const ActionWrapperPending = (state: IUnknownObject, action: PayloadAction<unknown>): void => {
    const childStore = action.type.split('/')[1];
    state[childStore].error = null;
    state[childStore].loading = true;
    state[childStore].fetched = false;
};

export const ActionWrapperFulfilled = (state: IUnknownObject, action: PayloadAction<unknown>): void => {
    const childStore = action.type.split('/')[1];
    state[childStore].error = null;
    state[childStore].loading = false;
    state[childStore].fetched = true;
    state[childStore].data = action.payload;
};

export const ActionWrapperRejected = (state: IUnknownObject, action: PayloadAction<unknown>): void => {
    const childStore = action.type.split('/')[1];
    state[childStore].error = action.payload;
    state[childStore].loading = false;
    state[childStore].fetched = false;
    state[childStore].data = null;
};

export const ActionWrapperReset = (state: IUnknownObject, action: PayloadAction<IUnknownObject>): void => {
    const childStore = action?.payload?.context?.split('/')?.[1];
    if (state[childStore]) {
        state[childStore].error = null;
        state[childStore].fetched = false;
        state[childStore].loading = false;
        state[childStore].data = Array.isArray(state[childStore]?.data) ? [] : {};
    }
};
