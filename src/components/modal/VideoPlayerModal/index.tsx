import React, { cloneElement, FC, Fragment, ReactElement, useState } from 'react';
import ReactPlayer from 'react-player';
import { Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

export interface IVideoPlayerModalProps {
    url?: string;
    title?: string;
    children: ReactElement;
}
const VideoPlayerModal: FC<IVideoPlayerModalProps> = ({ url = '', title = 'Video Youtube', children }) => {
    const [visible, setVisible] = useState(false);
    return (
        <Fragment>
            {cloneElement(children, {
                onClick: () => setVisible(true),
                disabled: [undefined, null, ''].includes(url) || !ReactPlayer.canPlay(url),
            })}
            <Modal
                width={600}
                footer={null}
                title={title}
                destroyOnClose
                visible={visible}
                className={styles.videoPlayer}
                onCancel={() => setVisible(false)}
                closeIcon={<CloseCircleOutlined />}
            >
                <ReactPlayer controls url={url} width={600} height={400} />
            </Modal>
        </Fragment>
    );
};

export default VideoPlayerModal;
