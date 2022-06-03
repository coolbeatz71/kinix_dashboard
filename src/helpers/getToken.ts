import { API_TOKEN } from '@constants/platform';

const getToken = (): string | null => {
    // check the token with the jsonwebtoken package
    return localStorage.getItem(API_TOKEN) || '';
};

export const isLoggedIn = !!getToken();
export default getToken;
