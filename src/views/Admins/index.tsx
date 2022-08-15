import React, { FC, useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import PageTitle from '@components/common/PageTitle';
import UserModal from '@components/modal/UserModal';
import { EnumFormContext } from '@interfaces/app';
import ListAdmins from '@components/tables/ListAdmins';

const Admins: FC = () => {
    const [title, setTitle] = useState<string>('Admins');
    const [openAddAdminModal, setOpenAddAdminModal] = useState(false);

    return (
        <div>
            <PageTitle title={title}>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddAdminModal(true)}>
                    Ajouter
                </Button>
            </PageTitle>
            <UserModal
                accountType="admin"
                visible={openAddAdminModal}
                setVisible={setOpenAddAdminModal}
                formContext={EnumFormContext.CREATE}
            />
            <ListAdmins onTitle={(t) => setTitle(t)} />
        </div>
    );
};

export default Admins;
