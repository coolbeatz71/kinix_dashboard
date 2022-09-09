import React, { FC, Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import numeral from 'numeral';
import { EnumStatus, IUnknownObject } from '@interfaces/app';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import { LIMIT } from '@constants/app';
import format from '@helpers/formatString';
import tableColumns from './columns';
import getAllAdsAction from '@redux/ads/getAll';
import { useAppDispatch } from '@redux/store';
import { Card, Col, Row, Table } from 'antd';
import ErrorAlert from '@components/common/ErrorAlert';
import TableTitle from '@components/common/TableTitle';
import { ADS_PATH } from '@constants/paths';
import TableStatusFilter from '@components/common/TableStatusFilter';
import TableSearchInput from '@components/common/TableSearchInput';

import styles from './index.module.scss';

export interface IListAdsProps {
    onTitle?: (title: string) => void;
    onSelect?: (ads: IUnknownObject) => void;
}

const ListAds: FC<IListAdsProps> = ({ onSelect, onTitle }) => {
    const { push } = useHistory();
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState<EnumStatus>(EnumStatus.ALL);
    const { error, loading, data } = useSelector(({ ads: { all } }: IRootState) => all);

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
            getAllAdsAction({
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
            getAllAdsAction({
                page: p,
                limit: l,
                search: s,
                status: currentStatus,
            }),
        );
    };

    const Wrapper = onSelect === undefined ? Card : Fragment;
    const title = `Ads ${!isStatusAll ? `${format(isStatusActive ? 'actifs' : 'inactifs)', 'lowercase')}` : ''}`;
    useEffect(() => onTitle?.(title), [onTitle, title]);

    const navigateToStatus = (status: EnumStatus): void => {
        if (status === EnumStatus.ALL) push(ADS_PATH);
        else {
            push({
                pathname: ADS_PATH,
                search: `?status=${format(status, 'lowercase')}`,
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
                    loading={loading}
                    scroll={{ x: 1500 }}
                    dataSource={data?.rows}
                    className={styles.table}
                    rowKey={(ads: IUnknownObject) => ads.id}
                    columns={tableColumns(() => changePage(page, limit, search), onSelect)}
                    {...(onSelect ? { rowSelection: { onSelect, type: 'radio' } } : {})}
                    pagination={{
                        current: page,
                        pageSize: limit,
                        total: data?.total,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        showTotal: (t) => `${numeral(t).format('0,0')} ads`,
                        onChange: (current, limit) => changePage(current, limit, search),
                        onShowSizeChange: (current, size) => changePage(current, size, search),
                    }}
                />
            </Wrapper>
        </Fragment>
    );
};

export default ListAds;
