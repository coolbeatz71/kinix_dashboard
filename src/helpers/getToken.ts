import { API_TOKEN } from '@constants/platform';
import { decodeToken } from 'react-jwt';

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

export const isJWTValid = !!verifyToken();
export default getToken;
