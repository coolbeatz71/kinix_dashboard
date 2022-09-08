import React, { FC } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import PageTitle from '@components/common/PageTitle';
import { useState } from 'react';
import { LIMIT } from '@constants/app';
import { EnumFormContext } from '@interfaces/app';
import VideoModal from '@components/modal/VideoModal';
import ListVideos from '@components/tables/ListVideos';
import getAllVideosAction from '@redux/videos/getAll';
import { useAppDispatch } from '@redux/store';

const Videos: FC = () => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState<string>('Videos');
    const [openAddVideoModal, setOpenAddVideoModal] = useState(false);

    const [pagination] = useState({
        page: 1,
        limit: LIMIT,
        search: '',
    });

    const { page, limit, search } = pagination;

    const reload = (): void => {
        dispatch(
            getAllVideosAction({
                page,
                limit,
                search,
            }),
        );
    };

    return (
        <div>
            <PageTitle title={title}>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddVideoModal(true)}>
                    Ajouter
                </Button>
            </PageTitle>

            <VideoModal
                reload={reload}
                visible={openAddVideoModal}
                setVisible={setOpenAddVideoModal}
                formContext={EnumFormContext.CREATE}
            />

            <ListVideos onTitle={(t) => setTitle(t)} />
        </div>
    );
};

export default Videos;
