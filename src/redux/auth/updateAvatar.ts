import api from 'services/axios';
import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authSlice } from '.';
import setCurrentUserAction from '../users/setCurrentUser';

interface IParams {
    avatar: string;
    dispatch: AppDispatch;
}

export const resetUpdateAvatarAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/updateAvatar' }));
    };

const updateAvatarAction = createAsyncThunk('auth/updateAvatar', async (params: IParams, { rejectWithValue }) => {
    const { avatar, dispatch } = params;

    try {
        const { data } = await api.put('/auth/update/avatar', {
            avatar,
        });
        dispatch(setCurrentUserAction(data));
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default updateAvatarAction;
