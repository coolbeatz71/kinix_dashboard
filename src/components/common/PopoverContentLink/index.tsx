import React, { ReactElement } from 'react';
import { Space } from 'antd';
import { BiLinkExternal } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { IUnknownObject } from '@interfaces/app';

declare const TYPE_ELE_LIST: ['articles', 'videos'];
export declare type IContentType = typeof TYPE_ELE_LIST[number];

const PopoverContentLink = (record: IUnknownObject, type: IContentType): ReactElement => (
    <Link
        className="text-decoration-none"
        to={type === 'videos' ? `/${type}/watch/${record?.slug}` : `/${type}/${record?.slug}`}
    >
        <Space>
            <span>
                <BiLinkExternal />
            </span>
            <span>{record?.title}</span>
        </Space>
    </Link>
);

export default PopoverContentLink;
