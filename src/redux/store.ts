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
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { rootReducer, IRootState } from './reducers';
import { useDispatch } from 'react-redux';
import { IUnknownObject } from '@interfaces/app';
import storage from 'redux-persist/lib/storage';

const isDevMode = process.env.NODE_ENV === 'development';

type IAppDispatch = ThunkDispatch<CombinedState<IUnknownObject>, undefined, AnyAction> & Dispatch<AnyAction>;

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['users', 'auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    devTools: isDevMode,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(logger),
});

export type AppThunk = ThunkAction<void, IRootState, null, Action>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): IAppDispatch => useDispatch<AppDispatch>();
export const persistor = persistStore(store);

export default store;
