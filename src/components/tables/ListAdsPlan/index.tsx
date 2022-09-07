import React, { FC, Fragment, useEffect, useState } from 'react';
import numeral from 'numeral';
import { IUnknownObject } from '@interfaces/app';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import { LIMIT } from '@constants/app';
import tableColumns from './columns';
import getAllAdsPlanAction from '@redux/ads/plans';
import { useAppDispatch } from '@redux/store';
import { Card, Col, Row, Table } from 'antd';
import ErrorAlert from '@components/common/ErrorAlert';
import TableTitle from '@components/common/TableTitle';

import styles from './index.module.scss';

export interface IListAdsPlanProps {
    onTitle?: (title: string) => void;
    onSelect?: (user: IUnknownObject) => void;
}

const ListAdsPlan: FC<IListAdsPlanProps> = ({ onSelect, onTitle }) => {
    const dispatch = useAppDispatch();
    const { error, loading, data } = useSelector(({ ads: { plans } }: IRootState) => plans);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: LIMIT,
    });
    const { page, limit } = pagination;

    useEffect(() => {
        dispatch(getAllAdsPlanAction());
    }, [dispatch]);

    const changePage = (p: number, l: number): void => {
        setPagination({ page: p, limit: l });
        dispatch(getAllAdsPlanAction());
    };

    const Wrapper = onSelect === undefined ? Card : Fragment;
    const title = "Formule d'abonnement Ads";
    useEffect(() => onTitle?.(title), [onTitle, title]);

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
                </Row>
                <br />
                <Table
                    loading={loading}
                    scroll={{ x: 1500 }}
                    dataSource={data?.rows}
                    className={styles.table}
                    rowKey={(user: IUnknownObject) => user.id}
                    columns={tableColumns(() => changePage(page, limit), onSelect)}
                    {...(onSelect ? { rowSelection: { onSelect, type: 'radio' } } : {})}
                    pagination={{
                        current: page,
                        pageSize: limit,
                        total: data?.total,
                        showSizeChanger: true,
                        pageSizeOptions: ['10'],
                        showTotal: (t) => `${numeral(t).format('0,0')} formule d'abonnement ads`,
                        onChange: (current, limit) => changePage(current, limit),
                        onShowSizeChange: (current, size) => changePage(current, size),
                    }}
                />
            </Wrapper>
        </Fragment>
    );
};

export default ListAdsPlan;
