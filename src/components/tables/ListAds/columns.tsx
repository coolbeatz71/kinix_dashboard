import { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { IUnknownObject } from '@interfaces/app';
import { IAds, IAdsPlan, IUser } from '@interfaces/api';
import { LinkOutlined } from '@ant-design/icons';
import { Tag, Image } from 'antd';
import format from '@helpers/formatString';
import { promotionPlanColors } from '@constants/colors';
import AdsTableActions from './AdsTableActions';

dayjs.extend(duration);

const statusCol = {
    width: 120,
    key: 'active',
    title: 'Status',
    dataIndex: 'active',
    fixed: 'right',
    render: (active: boolean) => (
        <Tag color={active ? 'green' : 'volcano'} className="rounded">
            {format(active ? 'actif' : 'inactif')}
        </Tag>
    ),
};

const actionCol = (reload: () => void): IUnknownObject => ({
    title: '',
    width: 32,
    key: 'action',
    fixed: 'right',
    align: 'center',
    className: 'action',
    dataIndex: 'action',
    render: (...prp: IAds[]) => <AdsTableActions reload={reload} ads={prp[1]} />,
});

const tableColumns = (reload: () => void, onSelect?: (ads: IAds) => void): ColumnType<IAds | IUnknownObject>[] => [
    {
        title: 'Lien',
        key: 'link',
        dataIndex: 'link',
        width: 50,
        fixed: 'left',
        align: 'center',
        render: (_, ads: IAds) =>
            ads.redirectUrl ? (
                <a target="_blank" href={ads.redirectUrl} rel="noreferrer">
                    <LinkOutlined />
                </a>
            ) : (
                '-'
            ),
    },
    {
        title: 'Image',
        key: 'image',
        dataIndex: 'image',
        width: 80,
        fixed: 'left',
        align: 'center',
        render: (_, ads: IAds) => <Image width={25} src={ads.image} />,
    },
    {
        title: 'Titre',
        key: 'title',
        dataIndex: 'title',
        width: 150,
        fixed: 'left',
        ellipsis: true,
        render: (dt: string) => dt || '-',
    },
    {
        title: 'Plan',
        key: 'ads_plan',
        fixed: 'left',
        dataIndex: 'ads_plan',
        width: 100,
        render: (plan: IAdsPlan) => (
            <Tag color={promotionPlanColors[plan?.name]} className="rounded">
                {format(plan?.name)}
            </Tag>
        ),
    },
    {
        title: 'Auteur',
        key: 'user',
        dataIndex: 'user',
        width: 120,
        render: (user: IUser) => user?.userName || '-',
    },
    {
        title: 'Créé le',
        key: 'createdAt',
        dataIndex: 'createdAt',
        width: 120,
        render: (date: string) => dayjs(date).format('DD MMM YYYY'),
    },
    {
        title: 'Modifié le',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        width: 120,
        render: (date: string) => dayjs(date).format('DD MMM YYYY'),
    },
    {
        title: 'Date de lancement',
        key: 'startDate',
        dataIndex: 'startDate',
        width: 150,
        fixed: 'right',
        render: (date: string) => dayjs(date).format('DD MMM YYYY'),
    },
    {
        title: 'Date de fin',
        key: 'endDate',
        dataIndex: 'endDate',
        width: 150,
        fixed: 'right',
        render: (date: string) => dayjs(date).format('DD MMM YYYY'),
    },
    ...[statusCol],
    ...(onSelect ? [] : [actionCol(reload)]),
];

export default tableColumns;
