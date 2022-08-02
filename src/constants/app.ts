import { EnumStatus } from '@interfaces/app';
import { DefaultOptionType } from 'antd/lib/select';

export const LIMIT = 10;

export const STATUS_FILTER_LIST: DefaultOptionType[] = [
    { label: 'Tout', value: EnumStatus.ALL },
    { label: 'Actif', value: EnumStatus.ACTIVE },
    { label: 'Inactif', value: EnumStatus.INACTIVE },
];
