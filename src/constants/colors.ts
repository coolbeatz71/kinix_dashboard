import { IUnknownObject } from '@interfaces/app';

export const PRIMARY = '#0c2346';
export const SUCCESS = '#1dd3b0';
export const ERROR = '#ef476f';
export const WARNING = '#f07f34';
export const YELLOW = '#ffc300';
export const LINK = '#1890ff';
export const GRAY = '#bbbbbb';
export const WHITE = '#ffffff';

export const GOOGLE = '#e45e52';
export const FACEBOOK = '#4267b2';

export const providerColors: IUnknownObject = {
    GOOGLE,
    FACEBOOK,
    LOCAL: PRIMARY,
};

export const clientColors: IUnknownObject = {
    VIDEO_CLIENT: LINK,
    ADS_CLIENT: YELLOW,
    VIEWER_CLIENT: GRAY,
};

export const adsPlanColors: IUnknownObject = {
    FREE: GRAY,
    BASIC: WARNING,
    PREMIUM: PRIMARY,
    PROFESSIONAL: SUCCESS,
};

export const adminColors: IUnknownObject = {
    ADMIN: WARNING,
    SUPER_ADMIN: PRIMARY,
};
