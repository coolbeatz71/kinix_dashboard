import React, { FC, useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@redux/store';
import { LIMIT } from '@constants/app';
import PageTitle from '@components/common/PageTitle';
import UserModal from '@components/modal/UserModal';
import { EnumFormContext } from '@interfaces/app';
import ListUsers from '@components/tables/ListUsers';
import getClientsAction from '@redux/users/getClients';

const Users: FC = () => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState<string>('Users');
    const [openAddUserModal, setOpenAddUserModal] = useState(false);

    const [pagination] = useState({
        page: 1,
        limit: LIMIT,
        search: '',
    });

    const { page, limit, search } = pagination;

    const reload = (): void => {
        dispatch(
            getClientsAction({
                page,
                limit,
                search,
            }),
        );
    };

    return (
        <div>
            <PageTitle title={title}>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddUserModal(true)}>
                    Ajouter
                </Button>
            </PageTitle>
            <UserModal
                reload={reload}
                accountType="client"
                visible={openAddUserModal}
                setVisible={setOpenAddUserModal}
                formContext={EnumFormContext.CREATE}
            />
            <ListUsers onTitle={(t) => setTitle(t)} />
        </div>
    );
};

export default Users;
