import React, { FC, Fragment, useEffect, useState } from 'react';
import numeral from 'numeral';
import { Card, Col, Row, Table } from 'antd';
import { IUnknownObject } from '@interfaces/app';
import { LIMIT } from '@constants/app';
import { useAppDispatch } from '@redux/store';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import getAllVideosAction from '@redux/videos/getAll';
import { EnumStatus } from '@interfaces/app';
import TableTitle from '@components/common/TableTitle';
import ErrorAlert from '@components/common/ErrorAlert';
import { useHistory } from 'react-router-dom';
import { VIDEO_PATH } from '@constants/paths';
import format from '@helpers/formatString';
import tableColumns from './columns';
import TableSearchInput from '@components/common/TableSearchInput';
import TableStatusFilter from '@components/common/TableStatusFilter';
import useRouteQuery from '@hooks/useRouteQuery';
import EnumCategory from '@interfaces/category';

import styles from './index.module.scss';

export interface ListVideosProps {
    onTitle?: (title: string) => void;
    onSelect?: (video: IUnknownObject) => void;
}

const ListVideos: FC<ListVideosProps> = ({ onSelect, onTitle }) => {
    const { push } = useHistory();
    const query = useRouteQuery();
    const dispatch = useAppDispatch();
    const category = query.get('category');

    const [status, setStatus] = useState<EnumStatus>(EnumStatus.ALL);
    const {
        data: { total, rows },
        loading,
        error,
    } = useSelector(({ videos: { all } }: IRootState) => all);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: LIMIT,
        search: '',
    });
    const { page, limit, search } = pagination;

    const isStatusAll = status === EnumStatus.ALL;
    const isStatusActive = status === EnumStatus.ACTIVE;
    const currentStatus = isStatusAll ? undefined : format(status, 'lowercase');

    const values = Object.values(EnumCategory);
    const isCategoryValid = values.includes(category as unknown as EnumCategory);

    useEffect(() => {
        dispatch(
            getAllVideosAction({
                page,
                limit,
                search,
                status: currentStatus,
                category: isCategoryValid ? category : undefined,
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, status]);

    const changePage = (p: number, l: number, s: string): void => {
        setPagination({ page: p, limit: l, search: s });
        dispatch(
            getAllVideosAction({
                page: p,
                limit: l,
                search: s,
                status: currentStatus,
            }),
        );
    };

    const Wrapper = onSelect === undefined ? Card : Fragment;
    const title = `Videos ${!isStatusAll ? `${format(isStatusActive ? 'actifs' : 'inactifs)', 'lowercase')}` : ''}`;
    useEffect(() => onTitle?.(title), [onTitle, title]);

    const navigateToStatus = (status: EnumStatus): void => {
        if (status === EnumStatus.ALL) push(VIDEO_PATH);
        else {
            push({
                search: `?status=${format(status, 'lowercase')}`,
                pathname: category ? `${VIDEO_PATH}?category=${category}` : VIDEO_PATH,
            });
        }
    };

    return (
        <Fragment>
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
                    dataSource={rows}
                    loading={loading}
                    scroll={{ x: 1500 }}
                    className={styles.table}
                    rowKey={(video: IUnknownObject) => video.id}
                    {...(onSelect ? { rowSelection: { onSelect, type: 'radio' } } : {})}
                    columns={tableColumns(() => changePage(page, limit, search), onSelect)}
                    pagination={{
                        total,
                        current: page,
                        pageSize: limit,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        showTotal: (t) => `${numeral(t).format('0,0')} videos`,
                        onChange: (current, limit) => changePage(current, limit, search),
                        onShowSizeChange: (current, size) => changePage(current, size, search),
                    }}
                />
            </Wrapper>
        </Fragment>
    );
};

export default ListVideos;
