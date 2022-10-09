import React, { FC, Fragment, useEffect, useState } from 'react';
import numeral from 'numeral';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Table } from 'antd';
import { IUnknownObject } from '@interfaces/app';
import { IRootState } from '@redux/reducers';
import { LIMIT } from '@constants/app';
import tableColumns from './columns';
import { useAppDispatch } from '@redux/store';
import getAllStoryPlanAction from '@redux/story/plans';
import ErrorAlert from '@components/common/ErrorAlert';
import TableTitle from '@components/common/TableTitle';

import styles from './index.module.scss';

export interface IListStoryPlanProps {
    onTitle?: (title: string) => void;
    onSelect?: (plan: IUnknownObject) => void;
}

const ListStoryPlan: FC<IListStoryPlanProps> = ({ onSelect, onTitle }) => {
    const dispatch = useAppDispatch();
    const { error, loading, data } = useSelector(({ story: { plans } }: IRootState) => plans);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: LIMIT,
    });
    const { page, limit } = pagination;

    useEffect(() => {
        dispatch(getAllStoryPlanAction());
    }, [dispatch]);

    const changePage = (p: number, l: number): void => {
        setPagination({ page: p, limit: l });
        dispatch(getAllStoryPlanAction());
    };

    const Wrapper = onSelect === undefined ? Card : Fragment;
    const title = "Formule d'abonnement Story";
    useEffect(() => onTitle?.(title), [onTitle, title]);

    return (
        <Fragment>
            {error && (
                <ErrorAlert
                    showIcon
                    closable
                    error={error}
                    closeText="Re-Essayer"
                    banner={onSelect === undefined}
                    onClose={() => changePage(page, limit)}
                />
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
                    rowKey={(plan: IUnknownObject) => plan.id}
                    columns={tableColumns(() => changePage(page, limit), onSelect)}
                    {...(onSelect ? { rowSelection: { onSelect, type: 'radio' } } : {})}
                    pagination={{
                        current: page,
                        pageSize: limit,
                        total: data?.total,
                        showSizeChanger: true,
                        pageSizeOptions: ['10'],
                        onChange: (current, limit) => changePage(current, limit),
                        onShowSizeChange: (current, size) => changePage(current, size),
                        showTotal: (t) => `${numeral(t).format('0,0')} formule d'abonnement story`,
                    }}
                />
            </Wrapper>
        </Fragment>
    );
};

export default ListStoryPlan;
