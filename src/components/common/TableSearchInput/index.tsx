import React, { Dispatch, FC, SetStateAction } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

export interface ITableSearchInputProps {
    search: string;
    loading: boolean;
    changePage: (p: number, l: number, s: string) => void;
    pagination: {
        page: number;
        limit: number;
        search: string;
    };
    setPagination: Dispatch<
        SetStateAction<{
            page: number;
            limit: number;
            search: string;
        }>
    >;
}

const TableSearchInput: FC<ITableSearchInputProps> = ({ search, loading, pagination, changePage, setPagination }) => {
    const { limit } = pagination;
    return (
        <Input
            allowClear
            value={search}
            disabled={loading}
            placeholder="Recherche"
            prefix={<SearchOutlined />}
            onChange={(e) => {
                setPagination({ ...pagination, search: e.target.value });
                if (e.type !== 'change') changePage(1, limit, '');
            }}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    if ([null, '', undefined].includes(search)) changePage(1, limit, '');
                    else changePage(1, limit, search);
                }
            }}
        />
    );
};

export default TableSearchInput;
