import { IUnknownObject } from '@interfaces/app';
import EnumRole from '@interfaces/role';

export const isViewerClient = (role: EnumRole): boolean => role === EnumRole.VIEWER_CLIENT;
export const isAdsClient = (role: EnumRole): boolean => role === EnumRole.ADS_CLIENT;
export const isVideoClient = (role: EnumRole): boolean => role === EnumRole.VIDEO_CLIENT;
export const isAdmin = (role: EnumRole): boolean => role === EnumRole.ADMIN;
export const isSuperAdmin = (role: EnumRole): boolean => role === EnumRole.SUPER_ADMIN;

export const clientRoleLabelObj: IUnknownObject = {
    VIDEO_CLIENT: 'Client video',
    VIEWER_CLIENT: 'Utilisateur',
    ADS_CLIENT: 'Client promotion',
};

export const adminRoleLabelObj: IUnknownObject = {
    ADMIN: 'Administrateu',
    SUPER_ADMIN: 'Super administrateur',
};
