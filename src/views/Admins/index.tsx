import React, { FC, useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { LIMIT } from '@constants/app';
import { useAppDispatch } from '@redux/store';
import PageTitle from '@components/common/PageTitle';
import UserModal from '@components/modal/UserModal';
import { EnumFormContext } from '@interfaces/app';
import ListAdmins from '@components/tables/ListAdmins';
import getAdminsAction from '@redux/users/getAdmins';

const Admins: FC = () => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState<string>('Admins');
    const [openAddAdminModal, setOpenAddAdminModal] = useState(false);

    const [pagination] = useState({
        page: 1,
        limit: LIMIT,
        search: '',
    });

    const { page, limit, search } = pagination;

    const reload = (): void => {
        dispatch(
            getAdminsAction({
                page,
                limit,
                search,
            }),
        );
    };

    return (
        <div>
            <PageTitle title={title}>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddAdminModal(true)}>
                    Ajouter
                </Button>
            </PageTitle>
            <UserModal
                reload={reload}
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
