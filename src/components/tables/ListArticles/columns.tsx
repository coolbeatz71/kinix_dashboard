import React from 'react';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import { ColumnType } from 'antd/lib/table';
import { Badge, Popover, Tooltip } from 'antd';
import format from '@helpers/formatString';
import { IUnknownObject } from '@interfaces/app';
import { IArticle, IBookmark, IComment, ILike, IUser } from '@interfaces/api';
import ArticleTableActions from './ArticleTableActions';
import PopoverContentLink from '@components/common/PopoverContentLink';

const statusCol = {
    title: 'Status',
    key: 'active',
    dataIndex: 'active',
    width: 120,
    render: (active: boolean) => (
        <Badge color={active ? 'green' : 'volcano'} text={format(active ? 'actif' : 'inactif')} />
    ),
};

const actionCol = (reload: () => void): IUnknownObject => ({
    title: '',
    key: 'action',
    dataIndex: 'action',
    width: 32,
    fixed: 'right',
    render: (...prp: IArticle[]) => <ArticleTableActions record={prp[1]} reload={reload} />,
});

const tableColumns = (
    reload: () => void,
    status?: string | string[],
    onSelect?: (article: IArticle) => void,
): ColumnType<IUnknownObject>[] => [
    {
        title: 'Titre',
        key: 'title',
        dataIndex: 'title',
        width: 180,
        ellipsis: true,
        fixed: 'left',
        // render: (_, record: IArticle) => (
        //     <Popover placement="bottomLeft" content={PopoverContentLink(record, 'articles')}>
        //         <Link to={`/articles/${record.slug}`}>{format(record.title, 'upper-truncate')}</Link>
        //     </Popover>
        // ),
    },
    // {
    //     title: 'Auteur',
    //     key: 'user',
    //     dataIndex: 'user',
    //     width: 120,
    //     render: (user: IUser) => user.userName,
    // },
    // {
    //     title: 'Likes',
    //     key: 'like',
    //     dataIndex: 'like',
    //     sorter: (a: IArticle, b: IArticle) => Number(a.like?.length) - Number(b.like?.length),
    //     width: 120,
    //     render: (like: ILike[]) => (
    //         <Tooltip title={numeral(like.length).format()}>
    //             <span>{numeral(like.length).format('0.[00]a')}</span>
    //         </Tooltip>
    //     ),
    // },
    // {
    //     title: 'Commentaires',
    //     key: 'comment',
    //     dataIndex: 'comment',
    //     width: 120,
    //     sorter: (a: IArticle, b: IArticle) => Number(a.comment?.length) - Number(b.comment?.length),
    //     render: (comment: IComment[]) => (
    //         <Tooltip title={numeral(comment.length).format()}>
    //             <span>{numeral(comment.length).format('0.[00]a')}</span>
    //         </Tooltip>
    //     ),
    // },
    // {
    //     title: 'Favoris',
    //     key: 'bookmark',
    //     dataIndex: 'bookmark',
    //     width: 120,
    //     sorter: (a: IArticle, b: IArticle) => Number(a.bookmark?.length) - Number(b.bookmark?.length),
    //     render: (bookmark: IBookmark[]) => (
    //         <Tooltip title={numeral(bookmark.length).format()}>
    //             <span>{numeral(bookmark.length).format('0.[00]a')}</span>
    //         </Tooltip>
    //     ),
    // },
    // {
    //     title: 'Créé le',
    //     key: 'createdAt',
    //     dataIndex: 'createdAt',
    //     width: 100,
    //     render: (date: string) => dayjs(date).format('Do MMM'),
    // },
    // {
    //     title: 'Modifié le',
    //     key: 'updatedAt',
    //     dataIndex: 'updatedAt',
    //     width: 100,
    //     render: (date: string) => dayjs(date).format('Do MMM'),
    // },
    // ...(status ? [] : [statusCol]),
    // ...(onSelect ? [] : [actionCol(reload)]),
];

export default tableColumns;
