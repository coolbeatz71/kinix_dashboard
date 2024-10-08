import React from 'react';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { ColumnType } from 'antd/es/table';
import { Popover, Tag, Tooltip } from 'antd';
import format from '@helpers/formatString';
import { IUnknownObject } from '@interfaces/app';
import { IArticle, IUser } from '@interfaces/api';
import ArticleTableActions from './ArticleTableActions';
import PopoverContentLink from '@components/common/PopoverContentLink';

const statusCol = {
    width: 80,
    key: 'active',
    title: 'Status',
    fixed: 'right',
    dataIndex: 'active',
    render: (active: boolean) => (
        <Tag color={active ? 'green' : 'volcano'} className="rounded">
            {format(active ? 'actif' : 'inactif')}
        </Tag>
    ),
};

const featureCol = {
    width: 80,
    key: 'featured',
    title: 'A la une',
    fixed: 'right',
    dataIndex: 'featured',
    render: (featured: boolean) => (
        <Tag color={featured ? 'success' : 'error'} className="rounded">
            {format(featured ? 'oui' : 'non')}
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
    render: (...prp: IArticle[]) => <ArticleTableActions article={prp[1]} reload={reload} />,
});

const tableColumns = (
    reload: () => void,
    onSelect?: (article: IArticle) => void,
): ColumnType<IArticle | IUnknownObject>[] => [
    {
        title: 'Titre',
        key: 'title',
        dataIndex: 'title',
        width: 200,
        ellipsis: true,
        fixed: 'left',
        render: (_, article: IArticle) => (
            <Popover placement="bottomLeft" content={PopoverContentLink(article, 'articles')}>
                {article.title}
            </Popover>
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
        title: 'Likes',
        key: 'likesCount',
        dataIndex: 'likesCount',
        sorter: (a: IArticle, b: IArticle) => Number(a.likesCount) - Number(b.likesCount),
        width: 100,
        render: (likes: number) => (
            <Tooltip title={numeral(likes).format()}>
                <span>{numeral(likes).format('0.[00]a')}</span>
            </Tooltip>
        ),
    },
    {
        title: 'Commentaires',
        key: 'commentsCount',
        dataIndex: 'commentsCount',
        width: 100,
        sorter: (a: IArticle, b: IArticle) => Number(a.commentsCount) - Number(b.commentsCount),
        render: (comments: number) => (
            <Tooltip title={numeral(comments).format()}>
                <span>{numeral(comments).format('0.[00]a')}</span>
            </Tooltip>
        ),
    },
    {
        title: 'Favoris',
        key: 'bookmarksCount',
        dataIndex: 'bookmarksCount',
        width: 100,
        sorter: (a: IArticle, b: IArticle) => Number(a.bookmarksCount) - Number(b.bookmarksCount),
        render: (bookmarks: number) => (
            <Tooltip title={numeral(bookmarks).format()}>
                <span>{numeral(bookmarks).format('0.[00]a')}</span>
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
    ...[featureCol],
    ...[statusCol],
    ...(onSelect ? [] : [actionCol(reload)]),
];

export default tableColumns;
