import React, { FC, useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import PageTitle from '@components/common/PageTitle';
import UserModal from '@components/modal/UserModal';
import { EnumFormContext } from '@interfaces/app';
import ListUsers from '@components/tables/ListUsers';

const Users: FC = () => {
    const [title, setTitle] = useState<string>('Users');
    const [openAddUserModal, setOpenAddUserModal] = useState(false);

    return (
        <div>
            <PageTitle title={title}>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddUserModal(true)}>
                    Ajouter
                </Button>
            </PageTitle>
            <UserModal
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
