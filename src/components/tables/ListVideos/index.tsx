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
import TableCategoryFilter from '@components/common/TableCategoryFilter';

import styles from './index.module.scss';

export interface ListVideosProps {
    onTitle?: (title: string) => void;
    onSelect?: (video: IUnknownObject) => void;
}

const ListVideos: FC<ListVideosProps> = ({ onSelect, onTitle }) => {
    const { push } = useHistory();
    const query = useRouteQuery();
    const dispatch = useAppDispatch();
    const catQuery = query.get('category');

    const [status, setStatus] = useState<EnumStatus>(EnumStatus.ALL);
    const [category, setCategory] = useState<EnumCategory>((catQuery as EnumCategory) || EnumCategory.ALL);
    const { data, loading, error } = useSelector(({ videos: { all } }: IRootState) => all);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: LIMIT,
        search: '',
    });
    const { page, limit, search } = pagination;

    const isStatusAll = status === EnumStatus.ALL;
    const isCategoryAll = category === EnumCategory.ALL;
    const isStatusActive = status === EnumStatus.ACTIVE;
    const currentStatus = isStatusAll ? undefined : format(status, 'lowercase');
    const currentCategory = isCategoryAll ? undefined : category;

    const values = Object.values(EnumCategory);
    const isCategoryValid = values.includes(catQuery as unknown as EnumCategory);

    useEffect(() => {
        dispatch(
            getAllVideosAction({
                page,
                limit,
                search,
                status: currentStatus,
                category: isCategoryValid ? currentCategory : undefined,
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, status, category]);

    const changePage = (p: number, l: number, s: string): void => {
        setPagination({ page: p, limit: l, search: s });
        dispatch(
            getAllVideosAction({
                page: p,
                limit: l,
                search: s,
                status: currentStatus,
                category: currentCategory,
            }),
        );
    };

    const Wrapper = onSelect === undefined ? Card : Fragment;
    const title = `Videos ${!isStatusAll ? `${format(isStatusActive ? 'actifs' : 'inactifs)', 'lowercase')}` : ''}`;
    useEffect(() => onTitle?.(title), [onTitle, title]);

    const navigateToStatus = (selected: EnumStatus): void => {
        if (selected === EnumStatus.ALL) push(`${VIDEO_PATH}?category=${category}`);
        else {
            push({
                search: `?status=${format(selected, 'lowercase')}&category=${category}`,
            });
        }
    };

    const navigateToCategory = (selected: EnumCategory): void => {
        if (selected === ('' as EnumCategory)) push(`${VIDEO_PATH}?status=${format(status, 'lowercase')}`);
        else {
            push({
                search: `?status=${format(status, 'lowercase')}&category=${selected}`,
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
                            {title} ({numeral(data?.total).format()})
                        </TableTitle>
                    </Col>
                    <Col>
                        <TableStatusFilter status={status} setStatus={setStatus} navigateToStatus={navigateToStatus} />
                    </Col>
                    <Col>
                        <TableCategoryFilter
                            setCategory={setCategory}
                            category={category as EnumCategory}
                            navigateToCategory={navigateToCategory}
                        />
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
                    rowKey={(video: IUnknownObject) => video.id}
                    {...(onSelect ? { rowSelection: { onSelect, type: 'radio' } } : {})}
                    columns={tableColumns(() => changePage(page, limit, search), onSelect)}
                    pagination={{
                        total: data?.total,
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
