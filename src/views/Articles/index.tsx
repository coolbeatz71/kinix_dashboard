import React, { FC } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import PageTitle from '@components/common/PageTitle';
import ArticleModal from '@components/modal/ArticleModal';
import { useState } from 'react';
import { EnumFormContext } from '@interfaces/app';

const Articles: FC = () => {
    const [openAddArticleModal, setOpenAddArticleModal] = useState(false);

    return (
        <div>
            <PageTitle title="Articles">
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddArticleModal(true)}>
                    Ajouter
                </Button>
            </PageTitle>

            {openAddArticleModal && (
                <ArticleModal
                    visible={openAddArticleModal}
                    setVisible={setOpenAddArticleModal}
                    formContext={EnumFormContext.CREATE}
                />
            )}
        </div>
    );
};

export default Articles;
