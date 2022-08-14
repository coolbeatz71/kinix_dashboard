import React from 'react';
import dayjs from 'dayjs';
import { ColumnType } from 'antd/lib/table';
import { Tag } from 'antd';
import format from '@helpers/formatString';
import { IUnknownObject } from '@interfaces/app';
import { IUser } from '@interfaces/api';
import { clientColors, GRAY, LINK, providerColors } from '@constants/colors';
import { CLIENTS_ROLE } from '@constants/app';
import UserTableActions from './UserTableActions';

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

const providerCol = {
    title: 'Provider',
    key: 'provider',
    dataIndex: 'provider',
    width: 120,
    render: (provider: string) => (
        <Tag color={providerColors[provider]} className="rounded">
            {format(provider, 'lowercase')}
        </Tag>
    ),
};

const isVerifiedCol = {
    title: 'Verification',
    key: 'verified',
    dataIndex: 'verified',
    width: 120,
    render: (verified: string) => (
        <Tag color={verified ? 'green' : 'error'} className="rounded">
            {verified ? 'verifié' : 'non-verifié'}
        </Tag>
    ),
};

const roleCol = {
    width: 150,
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    render: (role: string) => (
        <Tag color={clientColors[role]} className="rounded">
            {format(CLIENTS_ROLE[role])}
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
    render: (...prp: IUser[]) => <UserTableActions user={prp[1]} reload={reload} />,
});

const tableColumns = (reload: () => void, onSelect?: (user: IUser) => void): ColumnType<IUser | IUnknownObject>[] => [
    {
        title: 'Username',
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
    ...[providerCol],
    ...[roleCol],
    ...[isLoggedInCol],
    ...[isVerifiedCol],
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
