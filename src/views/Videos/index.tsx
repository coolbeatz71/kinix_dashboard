import React, { FC } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import PageTitle from '@components/common/PageTitle';
import { useState } from 'react';
import { EnumFormContext } from '@interfaces/app';
import VideoModal from '@components/modal/VideoModal';
import ListArticles from '@components/tables/ListArticles';

const Videos: FC = () => {
    const [title, setTitle] = useState<string>('Videos');
    const [openAddVideoModal, setOpenAddVideoModal] = useState(false);

    return (
        <div>
            <PageTitle title={title}>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddVideoModal(true)}>
                    Ajouter
                </Button>
            </PageTitle>

            <VideoModal
                visible={openAddVideoModal}
                setVisible={setOpenAddVideoModal}
                formContext={EnumFormContext.CREATE}
            />

            <ListArticles onTitle={(t) => setTitle(t)} />
        </div>
    );
};

export default Videos;
