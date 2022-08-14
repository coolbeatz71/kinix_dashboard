import React, { FC, Fragment, useEffect, useState } from 'react';
import numeral from 'numeral';
import { Card, Col, Row, Table } from 'antd';
import { IUnknownObject } from '@interfaces/app';
import { LIMIT } from '@constants/app';
import { useAppDispatch } from '@redux/store';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import { EnumStatus } from '@interfaces/app';
import TableTitle from '@components/common/TableTitle';
import ErrorAlert from '@components/common/ErrorAlert';
import { useHistory } from 'react-router-dom';
import { USER_PATH } from '@constants/paths';
import format from '@helpers/formatString';
import tableColumns from './columns';
import TableSearchInput from '@components/common/TableSearchInput';
import TableStatusFilter from '@components/common/TableStatusFilter';
import getClientsAction from '@redux/users/getClients';
import useRouteQuery from '@hooks/useRouteQuery';
import { EnumRoleClient, EnumRoleAdmin } from '@interfaces/role';
import TableRoleFilter from '@components/common/TableRoleFilter';

import styles from './index.module.scss';

export interface ListUsersProps {
    onTitle?: (title: string) => void;
    onSelect?: (user: IUnknownObject) => void;
}

const ListUsers: FC<ListUsersProps> = ({ onSelect, onTitle }) => {
    const { push } = useHistory();
    const dispatch = useAppDispatch();
    const query = useRouteQuery();
    const roleQuery = query.get('role');

    const [status, setStatus] = useState<EnumStatus>(EnumStatus.ALL);
    const [role, setRole] = useState<EnumRoleClient | EnumRoleAdmin>(
        (roleQuery as EnumRoleClient) || EnumRoleClient.ALL,
    );
    const {
        error,
        loading,
        data: { total, rows },
    } = useSelector(({ users: { clients } }: IRootState) => clients);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: LIMIT,
        search: '',
    });
    const { page, limit, search } = pagination;
    const isStatusAll = status === EnumStatus.ALL;
    const isStatusActive = status === EnumStatus.ACTIVE;
    const isRoleAll = role === EnumRoleClient.ALL;
    const currentStatus = isStatusAll ? undefined : format(status, 'lowercase');
    const currentRole = isRoleAll ? undefined : role;

    const values = Object.values(EnumRoleClient);
    const isRoleValid = values.includes(roleQuery as unknown as EnumRoleClient);

    useEffect(() => {
        dispatch(
            getClientsAction({
                page,
                limit,
                search,
                status: currentStatus,
                role: isRoleValid ? currentRole : undefined,
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, status, role]);

    const changePage = (p: number, l: number, s: string): void => {
        setPagination({ page: p, limit: l, search: s });
        dispatch(
            getClientsAction({
                page: p,
                limit: l,
                search: s,
                role: currentRole,
                status: currentStatus,
            }),
        );
    };

    const Wrapper = onSelect === undefined ? Card : Fragment;
    const title = `Utilisateurs ${
        !isStatusAll ? `${format(isStatusActive ? 'actifs' : 'inactifs)', 'lowercase')}` : ''
    }`;
    useEffect(() => onTitle?.(title), [onTitle, title]);

    const navigateToStatus = (status: EnumStatus): void => {
        if (status === EnumStatus.ALL) push(USER_PATH);
        else {
            push({
                pathname: USER_PATH,
                search: `?status=${format(status, 'lowercase')}`,
            });
        }
    };

    const navigateToRole = (selected: EnumRoleClient | EnumRoleAdmin): void => {
        if (selected === ('' as EnumRoleClient)) push(`${USER_PATH}?status=${format(status, 'lowercase')}`);
        else {
            push({
                search: `?status=${format(status, 'lowercase')}&role=${selected}`,
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
                        <TableRoleFilter
                            context="clients"
                            setRole={setRole}
                            role={role as EnumRoleClient}
                            navigateToRole={navigateToRole}
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
                    dataSource={rows}
                    loading={loading}
                    scroll={{ x: 1500 }}
                    className={styles.table}
                    rowKey={(user: IUnknownObject) => user.id}
                    {...(onSelect ? { rowSelection: { onSelect, type: 'radio' } } : {})}
                    columns={tableColumns(() => changePage(page, limit, search), onSelect)}
                    pagination={{
                        total,
                        current: page,
                        pageSize: limit,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        showTotal: (t) => `${numeral(t).format('0,0')} utilisateurs`,
                        onChange: (current, limit) => changePage(current, limit, search),
                        onShowSizeChange: (current, size) => changePage(current, size, search),
                    }}
                />
            </Wrapper>
        </Fragment>
    );
};

export default ListUsers;
