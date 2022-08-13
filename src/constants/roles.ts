import EnumRole from '@interfaces/role';

export const isViewerClient = (role: EnumRole): boolean => role === EnumRole.VIEWER_CLIENT;
export const isAdsClient = (role: EnumRole): boolean => role === EnumRole.ADS_CLIENT;
export const isVideoClient = (role: EnumRole): boolean => role === EnumRole.VIDEO_CLIENT;
export const isAdmin = (role: EnumRole): boolean => role === EnumRole.ADMIN;
export const isSuperAdmin = (role: EnumRole): boolean => role === EnumRole.SUPER_ADMIN;
