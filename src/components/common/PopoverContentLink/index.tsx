import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { IUnknownObject } from '@interfaces/app';

declare const TYPE_ELE_LIST: ['articles', 'videos'];
export declare type IContentType = typeof TYPE_ELE_LIST[number];

export const PopoverContentLink = (record: IUnknownObject, type: IContentType): ReactElement => (
    <Link to={`/${type}/${record?.slug}`}>{record?.title}</Link>
);

export default PopoverContentLink;
