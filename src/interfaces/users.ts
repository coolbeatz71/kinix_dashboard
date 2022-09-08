import EnumProvider from './provider';
import EnumRole from './role';

export interface IUserData {
    id?: number;
    userName: string;
    email?: string | null;
    password?: string;
    phoneNumber?: string | null;
    provider?: EnumProvider;
    isLoggedIn?: boolean;
    verified?: boolean;
    image?: string | null;
    allowEmailNotification?: boolean;
    role?: EnumRole;
    countryName?: string;
    countryFlag?: string;
    phoneISOCode?: string;
    phoneDialCode?: string;
    phonePartial?: string;
    createdAt?: string;
    updatedAt?: string;
}
