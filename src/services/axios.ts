import { persistor } from '@redux/store';
import { LOGIN_REQUIRED, TOKEN_INVALID_EXPIRED } from '@constants/message';
import { LOGIN_PATH } from '@constants/paths';
import { API_TOKEN, API_URL, PLATFORM_NAME, USER_DATA } from '@constants/platform';
import getToken from '@helpers/getToken';
import axios, { AxiosError, AxiosResponse } from 'axios';

const token = getToken();

const api = axios.create({
    baseURL: API_URL,
    headers: {
        platform: PLATFORM_NAME,
        Authorization: `Bearer ${token}`,
    },
});

const responseHandler = (response: AxiosResponse): AxiosResponse => response.data;
const errorHandler = async (error: AxiosError): Promise<AxiosError> => {
    let errorResponse;
    if ([LOGIN_REQUIRED, TOKEN_INVALID_EXPIRED].includes(error.response?.data.code)) {
        persistor.purge();
        localStorage.removeItem(USER_DATA);
        localStorage.removeItem(API_TOKEN);
        window.location.href = LOGIN_PATH;
    }

    console.log(error.response);

    if (error.response) {
        const msg = error.response.data.message;
        errorResponse = typeof msg !== 'string' ? { message: msg[0]?.msg } : error.response.data;
    } else errorResponse = error.message;

    return await Promise.reject(errorResponse);
};

api.interceptors.response.use(responseHandler, errorHandler);

export default api;
