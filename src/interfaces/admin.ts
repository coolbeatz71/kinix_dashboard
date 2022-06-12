import EnumProvider from './provider';
import EnumRole from './userRole';

export interface ICurrentAdmin {
    role: EnumRole;
    email: string;
    image: string;
    userName: string;
    provider: EnumProvider;
    verified: boolean;
    phoneNumber: string;
    isLoggedIn: boolean;
    allowEmailNotification: boolean;
}
