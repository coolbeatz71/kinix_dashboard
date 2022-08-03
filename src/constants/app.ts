import { EnumStatus } from '@interfaces/app';
import EnumCategory from '@interfaces/category';
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
