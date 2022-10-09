import React, { FC, Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Dropdown, Menu } from 'antd';
import { IRootState } from '@redux/reducers';
import { FormOutlined, PlayCircleOutlined, SettingOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import EnumRole from '@interfaces/role';
import { IVideo } from '@interfaces/api';
import VideoActionModal from '../ActionModal';
import { VIDEO_PATH } from '@constants/paths';
import VideoModal from '@components/modal/VideoModal';
import { EnumArticleVideoActionContext, EnumFormContext } from '@interfaces/app';
import VideoPlayerModal from '@components/modal/VideoPlayerModal';

import styles from './index.module.scss';

export interface IVideoTableActionsProps {
    video: IVideo;
    reload: () => void;
}

const VideoTableActions: FC<IVideoTableActionsProps> = ({ video, reload }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [openAddVideoModal, setOpenAddVideoModal] = useState(false);
    const { data: user } = useSelector(({ users }: IRootState) => users?.currentUser);

    return (
        <Fragment>
            <Dropdown
                arrow
                visible={openMenu}
                trigger={['click']}
                className={styles.actions}
                onVisibleChange={(v) => setOpenMenu(v)}
                overlay={
                    <Menu className={styles.actions__menu}>
                        <VideoPlayerModal url={video.link}>
                            <Button
                                type="text"
                                icon={<PlayCircleOutlined />}
                                className={styles.actions__button}
                                onClick={() => {
                                    setOpenMenu(false);
                                    setOpenAddVideoModal(true);
                                }}
                            >
                                Aperçu
                            </Button>
                        </VideoPlayerModal>
                        <Link
                            rel="noopener noreferrer"
                            to={`${VIDEO_PATH}/watch/${video.slug}`}
                            onClick={() => {
                                setOpenMenu(false);
                            }}
                        >
                            <Button
                                type="text"
                                icon={<VideoCameraOutlined />}
                                className={styles.actions__button}
                                onClick={() => {
                                    setOpenMenu(false);
                                }}
                            >
                                Details
                            </Button>
                        </Link>

                        <Button
                            type="text"
                            icon={<FormOutlined />}
                            className={styles.actions__button}
                            onClick={() => {
                                setOpenMenu(false);
                                setOpenAddVideoModal(true);
                            }}
                        >
                            Modifier
                        </Button>

                        <VideoModal
                            reload={reload}
                            initialValues={video}
                            visible={openAddVideoModal}
                            setVisible={setOpenAddVideoModal}
                            formContext={EnumFormContext.EDIT}
                        />

                        {user.role === EnumRole.SUPER_ADMIN && (
                            <Fragment>
                                <VideoActionModal
                                    reload={reload}
                                    video={video}
                                    closeMenu={() => setOpenMenu(false)}
                                    context={
                                        video.active
                                            ? EnumArticleVideoActionContext.DISABLE
                                            : EnumArticleVideoActionContext.APPROVE
                                    }
                                />

                                <VideoActionModal
                                    reload={reload}
                                    video={video}
                                    context={EnumArticleVideoActionContext.DELETE}
                                    closeMenu={() => setOpenMenu(false)}
                                />
                            </Fragment>
                        )}
                    </Menu>
                }
            >
                <Button className={styles.actions__icon} type="link" icon={<SettingOutlined />} />
            </Dropdown>
        </Fragment>
    );
};

export default VideoTableActions;
