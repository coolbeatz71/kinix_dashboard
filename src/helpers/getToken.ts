import { API_TOKEN } from '@constants/platform';
import { decodeToken, isExpired } from 'react-jwt';

const getToken = (): string | null => {
    return localStorage.getItem(API_TOKEN) || '';
};

export const verifyToken = (): unknown => {
    const token = getToken();
    if (!token) return false;
    try {
        const jwtPayload = decodeToken(token);
        return jwtPayload;
    } catch (err) {
        return false;
    }
};

export const isTokenExpired = (): boolean => {
    const token = getToken();
    if (token) return isExpired(token);
    return true;
};

export const isJWTValid = !!verifyToken();
export default getToken;
