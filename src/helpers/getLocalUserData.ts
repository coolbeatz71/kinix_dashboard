import { AES, enc } from 'crypto-js';
import { CRYPTO_PASSPHASE, USER_DATA } from '@constants/platform';
import { ICurrentAdmin } from '@interfaces/admin';
import { IUnknownObject } from '@interfaces/app';

export const setLocalUserData = (data: ICurrentAdmin): void => {
    const user = JSON.stringify(data);
    const encrypted = `${AES.encrypt(user, CRYPTO_PASSPHASE as string)}`;
    localStorage.setItem(USER_DATA, encrypted);
};

const getLocalUserData = (): IUnknownObject | undefined => {
    const user = localStorage.getItem(USER_DATA);
    if (user) {
        const decryptedBytes = AES.decrypt(user, CRYPTO_PASSPHASE as string);
        const plainText = decryptedBytes.toString(enc.Utf8);
        return JSON.parse(plainText);
    }
};

export default getLocalUserData;
