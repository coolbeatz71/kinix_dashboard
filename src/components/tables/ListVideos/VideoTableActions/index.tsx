import React, { FC, Fragment, useState } from 'react';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import { Button, Dropdown, Menu } from 'antd';
import { FormOutlined, PlayCircleOutlined, SettingOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { IVideo } from '@interfaces/api';
import VideoModal from '@components/modal/VideoModal';
import { EnumArticleVideoActionContext, EnumFormContext } from '@interfaces/app';
import VideoPlayerModal from '@components/modal/VideoPlayerModal';
import EnumRole from '@interfaces/role';
import VideoActionModal from '../ActionModal';

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
                        <Button
                            type="text"
                            icon={<VideoCameraOutlined />}
                            className={styles.actions__button}
                            onClick={() => {
                                setOpenMenu(false);
                            }}
                        >
                            <span>
                                <Link
                                    to={`/videos/${video.slug}`}
                                    rel="noopener noreferrer"
                                    onClick={() => {
                                        setOpenMenu(false);
                                    }}
                                >
                                    Details
                                </Link>
                            </span>
                        </Button>

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
