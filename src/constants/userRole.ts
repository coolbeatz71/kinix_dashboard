enum EnumRole {
    VIEWER_CLIENT = 'VIEWER_CLIENT',
    ADS_CLIENT = 'ADS_CLIENT',
    VIDEO_CLIENT = 'VIDEO_CLIENT',
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
}

export const isViewerClient = (user: EnumRole) => user === EnumRole.VIEWER_CLIENT;
export const isAdsClient = (user: EnumRole) => user === EnumRole.ADS_CLIENT;
export const isVideoClient = (user: EnumRole) => user === EnumRole.VIDEO_CLIENT;
export const isAdmin = (user: EnumRole) => user === EnumRole.ADMIN;
export const isSuperAdmin = (user: EnumRole) => user === EnumRole.SUPER_ADMIN;

export default EnumRole;
