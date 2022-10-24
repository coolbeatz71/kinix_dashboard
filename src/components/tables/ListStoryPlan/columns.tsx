import { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { IUnknownObject } from '@interfaces/app';
import { IStoryPlan } from '@interfaces/api';
import StoryPlanTableActions from './StoryPlanTableActions';

dayjs.extend(duration);

const actionCol = (reload: () => void): IUnknownObject => ({
    title: '',
    width: 32,
    key: 'action',
    fixed: 'right',
    align: 'center',
    className: 'action',
    dataIndex: 'action',
    render: (...prp: IStoryPlan[]) => <StoryPlanTableActions reload={reload} plan={prp[1]} />,
});

const tableColumns = (
    reload: () => void,
    onSelect?: (storyPlan: IStoryPlan) => void,
): ColumnType<IStoryPlan | IUnknownObject>[] => [
    {
        title: 'Formule',
        key: 'name',
        dataIndex: 'name',
        width: 120,
        fixed: 'left',
        ellipsis: true,
        render: (dt: string) => dt || '-',
    },
    {
        title: 'Prix ($ USD)',
        key: 'price',
        dataIndex: 'price',
        width: 120,
        ellipsis: true,
        render: (dt: string) => dt || '0',
    },
    {
        title: 'Durée',
        key: 'duration',
        dataIndex: 'duration',
        width: 120,
        ellipsis: true,
        render: (days: number) => {
            const dt = days > 15 ? `${dayjs.duration({ days }).asMonths().toFixed()} mois` : `${days} jours`;
            return dt || '-';
        },
    },
    {
        title: 'Créé le',
        key: 'createdAt',
        dataIndex: 'createdAt',
        width: 150,
        render: (date: string) => dayjs(date).format('DD MMM YYYY'),
    },
    {
        title: 'Modifié le',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        width: 150,
        render: (date: string) => dayjs(date).format('DD MMM YYYY'),
    },
    ...(onSelect ? [] : [actionCol(reload)]),
];

export default tableColumns;
