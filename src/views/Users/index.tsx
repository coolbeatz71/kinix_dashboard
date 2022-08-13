import React, { FC, useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import PageTitle from '@components/common/PageTitle';
import ArticleModal from '@components/modal/ArticleModal';
import { EnumFormContext } from '@interfaces/app';
import ListUsers from '@components/tables/ListUsers';

const Users: FC = () => {
    const [title, setTitle] = useState<string>('Users');
    const [openAddArticleModal, setOpenAddArticleModal] = useState(false);

    return (
        <div>
            <PageTitle title={title}>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddArticleModal(true)}>
                    Ajouter
                </Button>
            </PageTitle>
            {/* TODO: implement create users by the admin */}
            <ArticleModal
                visible={openAddArticleModal}
                setVisible={setOpenAddArticleModal}
                formContext={EnumFormContext.CREATE}
            />
            <ListUsers onTitle={(t) => setTitle(t)} />
        </div>
    );
};

export default Users;
