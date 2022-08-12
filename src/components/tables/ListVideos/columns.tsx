import React from 'react';
import dayjs from 'dayjs';
import StarRatingComponent from 'react-star-rating-component';
import numeral from 'numeral';
import { Popover, Tag, Tooltip } from 'antd';
import { IUnknownObject } from '@interfaces/app';
import { ColumnType } from 'antd/lib/table';
import { IVideo, IUser } from '@interfaces/api';
import format from '@helpers/formatString';
import VideoTableActions from './VideoTableActions';
import PopoverContentLink from '@components/common/PopoverContentLink';
import { LinkOutlined } from '@ant-design/icons';

const statusCol = {
    width: 120,
    key: 'active',
    title: 'Status',
    dataIndex: 'active',
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
    render: (...prp: IVideo[]) => <VideoTableActions video={prp[1]} reload={reload} />,
});

const tableColumns = (
    reload: () => void,
    onSelect?: (video: IVideo) => void,
): ColumnType<IVideo | IUnknownObject>[] => [
    {
        title: 'Lien',
        key: 'link',
        dataIndex: 'link',
        width: 45,
        fixed: 'left',
        render: (_, video: IVideo) => (
            <a target="_blank" href={video.link} rel="noreferrer">
                <LinkOutlined />
            </a>
        ),
    },
    {
        title: 'Titre',
        key: 'title',
        dataIndex: 'title',
        width: 200,
        ellipsis: true,
        fixed: 'left',
        render: (_, video: IVideo) => (
            <Popover placement="bottomLeft" content={PopoverContentLink(video, 'videos')}>
                {video.title}
            </Popover>
        ),
    },
    {
        title: 'Auteur',
        key: 'user',
        dataIndex: 'user',
        width: 120,
        render: (user: IUser) => user.userName,
    },
    {
        title: 'Avis',
        key: 'rate',
        dataIndex: 'rate',
        width: 120,
        sorter: (a: IVideo, b: IVideo) => Number(a.avgRate) - Number(b.avgRate),
        render: (_, video: IVideo) => (
            <StarRatingComponent editing={false} name="video-rate" starCount={5} value={Number(video.avgRate)} />
        ),
    },
    {
        title: 'Partages',
        key: 'share',
        dataIndex: 'share',
        sorter: (a: IVideo, b: IVideo) => Number(a.sharesCount) - Number(b.sharesCount),
        width: 100,
        render: (shares: number) => (
            <Tooltip title={numeral(shares).format()}>
                <span>{numeral(shares).format('0.[00]a')}</span>
            </Tooltip>
        ),
    },
    {
        title: 'Créé le',
        key: 'createdAt',
        dataIndex: 'createdAt',
        width: 100,
        render: (date: string) => dayjs(date).format('DD MMM YYYY'),
    },
    {
        title: 'Modifié le',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        width: 100,
        render: (date: string) => dayjs(date).format('DD MMM YYYY'),
    },
    ...[statusCol],
    ...(onSelect ? [] : [actionCol(reload)]),
];

export default tableColumns;
