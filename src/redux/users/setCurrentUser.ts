import { userSlice } from '.';
import { AppDispatch } from '@redux/store';
import { ICurrentAdmin } from '@interfaces/admin';

const setCurrentUserAction =
    (payload: ICurrentAdmin) =>
    (dispatch: AppDispatch): unknown => {
        return dispatch(userSlice.actions.currentUser({ ...payload }));
    };

export default setCurrentUserAction;
