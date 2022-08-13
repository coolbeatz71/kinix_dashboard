import { EnumStatus, IUnknownObject } from '@interfaces/app';
import EnumCategory from '@interfaces/category';
import { EnumRoleAdmin, EnumRoleClient } from '@interfaces/role';
import { DefaultOptionType } from 'antd/lib/select';

export const LIMIT = 10;

export const STATUS_FILTER_LIST: DefaultOptionType[] = [
    { label: 'Tout', value: EnumStatus.ALL },
    { label: 'Actif', value: EnumStatus.ACTIVE },
    { label: 'Inactif', value: EnumStatus.INACTIVE },
];

export const CATEGORY_FILTER_LIST: DefaultOptionType[] = [
    { label: 'Tout', value: EnumCategory.ALL },
    { label: 'Clip video', value: EnumCategory.MUSIC_VIDEO },
    { label: 'Podcast', value: EnumCategory.PODCAST },
    { label: 'Interview', value: EnumCategory.INTERVIEW },
    { label: 'LeFocus', value: EnumCategory.LEFOCUS },
    { label: 'Flex&Beatz', value: EnumCategory.FLEXBEATZ },
];

export const CLIENTS_FILTER_LIST: DefaultOptionType[] = [
    { label: 'Tout', value: EnumRoleClient.ALL },
    { label: 'Client video', value: EnumRoleClient.VIDEO_CLIENT },
    { label: 'Client promotion', value: EnumRoleClient.ADS_CLIENT },
    { label: 'Utilisateur', value: EnumRoleClient.VIEWER_CLIENT },
];

export const ADMINS_FILTER_LIST: DefaultOptionType[] = [
    { label: 'Tout', value: EnumRoleAdmin.ALL },
    { label: 'Administrateur', value: EnumRoleAdmin.ADMIN },
    { label: 'Super administrateur', value: EnumRoleAdmin.SUPER_ADMIN },
];

export const CLIENTS_ROLE: IUnknownObject = {
    VIDEO_CLIENT: 'Client video',
    ADS_CLIENT: 'Client promotion',
    VIEWER_CLIENT: 'Utilisateur',
};
