import React, { FC, Fragment, useEffect, useState } from 'react';
import numeral from 'numeral';
import { Card, Col, Input, Row, Select, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IUnknownObject } from '@interfaces/app';
import { LIMIT } from '@constants/app';
import { useAppDispatch } from '@redux/store';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import getAllArticlesAction from '@redux/articles/getAll';
import { EnumStatus } from '@interfaces/articles';
import TableTitle from '@components/common/TableTitle';
import ErrorAlert from '@components/common/ErrorAlert';
import { useHistory } from 'react-router-dom';
import { ARTICLE_PATH } from '@constants/paths';
import format from '@helpers/formatString';
import tableColumns from './columns';

const { Option } = Select;

export interface ListArticlesProps {
    onTitle?: (title: string) => void;
    onSelect?: (article: IUnknownObject) => void;
}

const ListArticles: FC<ListArticlesProps> = ({ onSelect, onTitle }) => {
    const { push } = useHistory();
    const dispatch = useAppDispatch();

    const [status, setStatus] = useState<EnumStatus>(EnumStatus.ALL);
    const {
        data: { total, rows },
        loading,
        error,
    } = useSelector(({ articles: { all } }: IRootState) => all);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: LIMIT,
        search: '',
    });
    const { page, limit, search } = pagination;
    const isStatusAll = status === EnumStatus.ALL;
    const isStatusActive = status === EnumStatus.ACTIVE;
    const currentStatus = isStatusAll ? undefined : format(status, 'lowercase');

    useEffect(() => {
        dispatch(
            getAllArticlesAction({
                page,
                limit,
                search,
                status: currentStatus,
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, status]);

    const changePage = (p: number, l: number, s: string): void => {
        setPagination({ page: p, limit: l, search: s });
        dispatch(
            getAllArticlesAction({
                page: p,
                limit: l,
                search: s,
                status: currentStatus,
            }),
        );
    };

    const Wrapper = onSelect === undefined ? Card : Fragment;
    const title = `Articles ${!isStatusAll ? `${format(isStatusActive ? 'actif' : 'inactif', 'lowercase')}` : ''}`;
    useEffect(() => onTitle?.(title), [onTitle, title]);

    const navigateToStatus = (status: EnumStatus): void => {
        if (status === EnumStatus.ALL) push(ARTICLE_PATH);
        else {
            push({
                pathname: ARTICLE_PATH,
                search: `?status=${format(status, 'lowercase')}`,
            });
        }
    };

    return (
        <>
            {error && (
                <ErrorAlert error={error} banner={onSelect === undefined} closeText="Re-Essayer" closable showIcon />
            )}
            <Wrapper>
                <Row gutter={24}>
                    <Col flex={1}>
                        <TableTitle goBack={onSelect === undefined}>
                            {title} ({numeral(total).format()})
                        </TableTitle>
                    </Col>
                    <Col>
                        <Select
                            value={status}
                            defaultValue={status}
                            style={{ width: 180 }}
                            onChange={(val) => {
                                setStatus(val);
                                navigateToStatus(val);
                            }}
                        >
                            <Option value={EnumStatus.ALL}>Tout</Option>
                            <Option value={EnumStatus.ACTIVE}>Actif</Option>
                            <Option value={EnumStatus.INACTIVE}>Inactif</Option>
                        </Select>
                    </Col>
                    <Col>
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
                    </Col>
                </Row>
                <br />
                <Table
                    dataSource={rows}
                    loading={loading}
                    scroll={{ x: 720 }}
                    rowKey={(record: IUnknownObject) => record.id}
                    {...(onSelect ? { rowSelection: { onSelect, type: 'radio' } } : {})}
                    columns={tableColumns(() => changePage(page, limit, search), onSelect)}
                    pagination={{
                        total,
                        current: page,
                        pageSize: limit,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        showTotal: (t) => `${numeral(t).format('0,0')} articles`,
                        onChange: (current, limit) => changePage(current, limit, search),
                        onShowSizeChange: (current, size) => changePage(current, size, search),
                    }}
                />
            </Wrapper>
        </>
    );
};

export default ListArticles;
