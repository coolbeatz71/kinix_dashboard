import React from 'react';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Tag, Image } from 'antd';
import duration from 'dayjs/plugin/duration';

import { LinkOutlined, PlayCircleTwoTone } from '@ant-design/icons';
import format from '@helpers/formatString';
import { IUnknownObject } from '@interfaces/app';
import { IStory, IStoryPlan, IUser } from '@interfaces/api';
import { promotionPlanColors } from '@constants/colors';
import StoryTableActions from './StoryTableActions';
import getFileType from '@helpers/getFiletype';
import VideoPlayerModal from '@components/modal/VideoPlayerModal';

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
    render: (...prp: IStory[]) => <StoryTableActions reload={reload} story={prp[1]} />,
});

const tableColumns = (
    reload: () => void,
    onSelect?: (story: IStory) => void,
): ColumnType<IStory | IUnknownObject>[] => [
    {
        title: 'Lien',
        key: 'link',
        dataIndex: 'link',
        width: 50,
        fixed: 'left',
        align: 'center',
        render: (_, story: IStory) =>
            story.redirectUrl ? (
                <a target="_blank" href={story.redirectUrl} rel="noreferrer">
                    <LinkOutlined />
                </a>
            ) : (
                '-'
            ),
    },
    {
        title: 'Image',
        key: '',
        dataIndex: '',
        width: 80,
        fixed: 'left',
        align: 'center',
        render: (_, story: IStory) => {
            const isImage = getFileType(story.mediaType) === 'image';
            return isImage ? (
                <Image width={25} src={story.media} />
            ) : (
                <VideoPlayerModal url={story.media}>
                    <PlayCircleTwoTone />
                </VideoPlayerModal>
            );
        },
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
        key: 'story_plan',
        fixed: 'left',
        dataIndex: 'story_plan',
        width: 100,
        render: (plan: IStoryPlan) => (
            <Tag color={promotionPlanColors[plan.name]} className="rounded">
                {format(plan.name)}
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
