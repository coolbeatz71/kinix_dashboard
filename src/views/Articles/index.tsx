import React, { FC } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import PageTitle from '@components/common/PageTitle';
import ArticleModal from '@components/common/ArticleModal';
import { useState } from 'react';

const Articles: FC = () => {
    const [openAddArticleModal, setOpenAddArticleModal] = useState(false);

    return (
        <div>
            <PageTitle title="Articles">
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddArticleModal(true)}>
                    Ajouter
                </Button>
            </PageTitle>

            <ArticleModal visible={openAddArticleModal} setVisible={setOpenAddArticleModal} />
        </div>
    );
};

export default Articles;
