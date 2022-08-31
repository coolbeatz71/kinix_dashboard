import React from 'react';
import dayjs from 'dayjs';
import { ColumnType } from 'antd/lib/table';
import { Tag } from 'antd';
import format from '@helpers/formatString';
import { IUnknownObject } from '@interfaces/app';
import { IUser } from '@interfaces/api';
import { adminColors, GRAY, LINK } from '@constants/colors';
import { ADMINS_ROLE } from '@constants/app';
import AdminTableActions from './AdminTableActions';

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

const isLoggedInCol = {
    width: 120,
    key: 'isLoggedIn',
    title: 'Activité',
    dataIndex: 'isLoggedIn',
    render: (isLoggedIn: boolean) => (
        <Tag color={isLoggedIn ? LINK : GRAY} className="rounded">
            {format(isLoggedIn ? 'En-ligne' : 'Hors-ligne')}
        </Tag>
    ),
};

const roleCol = {
    width: 150,
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    render: (role: string) => (
        <Tag color={adminColors[role]} className="rounded">
            {format(ADMINS_ROLE[role])}
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
    render: (...prp: IUser[]) => <AdminTableActions admin={prp[1]} reload={reload} />,
});

const tableColumns = (reload: () => void, onSelect?: (user: IUser) => void): ColumnType<IUser | IUnknownObject>[] => [
    {
        title: 'Pseudo',
        key: 'userName',
        dataIndex: 'userName',
        width: 120,
        ellipsis: true,
        fixed: 'left',
        render: (dt: string) => dt || '-',
    },
    {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        width: 250,
        fixed: 'left',
        ellipsis: true,
        render: (dt: string) => dt || '-',
    },
    {
        title: 'Téléphone',
        key: 'phoneNumber',
        dataIndex: 'phoneNumber',
        width: 250,
        ellipsis: true,
        render: (dt: string) => dt || '-',
    },
    ...[roleCol],
    ...[isLoggedInCol],
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
    ...[statusCol],
    ...(onSelect ? [] : [actionCol(reload)]),
];

export default tableColumns;
