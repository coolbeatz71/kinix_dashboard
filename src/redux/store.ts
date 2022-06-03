import logger from 'redux-logger';
import {
    Action,
    AnyAction,
    CombinedState,
    configureStore,
    Dispatch,
    ThunkAction,
    ThunkDispatch,
} from '@reduxjs/toolkit';
import { rootReducer, IRootState } from './reducers';
import { useDispatch } from 'react-redux';
import { IUnknownObject } from '@interfaces/app';

const isDevMode = process.env.NODE_ENV === 'development';

type IAppDispatch = ThunkDispatch<CombinedState<IUnknownObject>, undefined, AnyAction> & Dispatch<AnyAction>;

const store = configureStore({
    devTools: isDevMode,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppThunk = ThunkAction<void, IRootState, null, Action>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): IAppDispatch => useDispatch<AppDispatch>();

export default store;
