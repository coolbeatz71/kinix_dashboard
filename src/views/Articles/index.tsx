import React, { FC, useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import PageTitle from '@components/common/PageTitle';
import ArticleModal from '@components/modal/ArticleModal';
import { EnumFormContext } from '@interfaces/app';
import ListArticles from '@components/tables/ListArticles';

const Articles: FC = () => {
    const [title, setTitle] = useState<string>('Articles');
    const [openAddArticleModal, setOpenAddArticleModal] = useState(false);

    return (
        <div>
            <PageTitle title={title}>
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

            <ListArticles onTitle={(t) => setTitle(t)} />
        </div>
    );
};

export default Articles;
