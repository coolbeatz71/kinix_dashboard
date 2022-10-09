import React, { FC, Fragment, useEffect, useState } from 'react';
import numeral from 'numeral';
import { Card, Col, Row, Table } from 'antd';
import { IUnknownObject } from '@interfaces/app';
import { LIMIT } from '@constants/app';
import { useAppDispatch } from '@redux/store';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import getAllArticlesAction from '@redux/articles/getAll';
import { EnumStatus } from '@interfaces/app';
import TableTitle from '@components/common/TableTitle';
import ErrorAlert from '@components/common/ErrorAlert';
import { useHistory } from 'react-router-dom';
import { ARTICLE_PATH } from '@constants/paths';
import format from '@helpers/formatString';
import tableColumns from './columns';
import TableSearchInput from '@components/common/TableSearchInput';
import TableStatusFilter from '@components/common/TableStatusFilter';

import styles from './index.module.scss';

export interface ListArticlesProps {
    onTitle?: (title: string) => void;
    onSelect?: (article: IUnknownObject) => void;
}

const ListArticles: FC<ListArticlesProps> = ({ onSelect, onTitle }) => {
    const { push } = useHistory();
    const dispatch = useAppDispatch();

    const [status, setStatus] = useState<EnumStatus>(EnumStatus.ALL);
    const { data, loading, error } = useSelector(({ articles: { all } }: IRootState) => all);

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
    const title = `Articles ${!isStatusAll ? `${format(isStatusActive ? 'actifs' : 'inactifs)', 'lowercase')}` : ''}`;
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
        <Fragment>
            {error && (
                <ErrorAlert
                    showIcon
                    closable
                    error={error}
                    closeText="Re-Essayer"
                    banner={onSelect === undefined}
                    onClose={() => changePage(page, limit, search)}
                />
            )}
            <Wrapper>
                <Row gutter={24}>
                    <Col flex={1}>
                        <TableTitle goBack={onSelect === undefined}>
                            {title} ({numeral(data?.total).format()})
                        </TableTitle>
                    </Col>
                    <Col>
                        <TableStatusFilter status={status} setStatus={setStatus} navigateToStatus={navigateToStatus} />
                    </Col>
                    <Col>
                        <TableSearchInput
                            search={search}
                            loading={loading}
                            changePage={changePage}
                            pagination={pagination}
                            setPagination={setPagination}
                        />
                    </Col>
                </Row>
                <br />
                <Table
                    dataSource={data?.rows}
                    loading={loading}
                    scroll={{ x: 1500 }}
                    className={styles.table}
                    rowKey={(article: IUnknownObject) => article.id}
                    {...(onSelect ? { rowSelection: { onSelect, type: 'radio' } } : {})}
                    columns={tableColumns(() => changePage(page, limit, search), onSelect)}
                    pagination={{
                        total: data?.total,
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
        </Fragment>
    );
};

export default ListArticles;
