import React, { FC, useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import PageTitle from '@components/common/PageTitle';
import ArticleModal from '@components/modal/ArticleModal';
import { EnumFormContext } from '@interfaces/app';
import ListArticles from '@components/tables/ListArticles';
import getAllArticlesAction from '@redux/articles/getAll';
import { useAppDispatch } from '@redux/store';
import { LIMIT } from '@constants/app';

const Articles: FC = () => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState<string>('Articles');
    const [openAddArticleModal, setOpenAddArticleModal] = useState(false);

    const [pagination] = useState({
        page: 1,
        limit: LIMIT,
        search: '',
    });

    const { page, limit, search } = pagination;

    const reload = (): void => {
        dispatch(
            getAllArticlesAction({
                page,
                limit,
                search,
            }),
        );
    };

    return (
        <div>
            <PageTitle title={title}>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddArticleModal(true)}>
                    Ajouter
                </Button>
            </PageTitle>

            <ArticleModal
                reload={reload}
                visible={openAddArticleModal}
                setVisible={setOpenAddArticleModal}
                formContext={EnumFormContext.CREATE}
            />

            <ListArticles onTitle={(t) => setTitle(t)} />
        </div>
    );
};

export default Articles;
