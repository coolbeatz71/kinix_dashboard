import React, { FC, ReactNode, useEffect } from 'react';
import { Button, message, Popover } from 'antd';
import { useAppDispatch } from '@redux/store';
import SocialShare from '../SocialShare';
import addVideoSharingAction, { resetAddVideoSharingAction } from '@redux/sharing/add';
import { IShareType, shareList } from '@constants/social';

import styles from './index.module.scss';

export interface ISharePopoverProps {
    slug: string;
    link: string;
    title: string;
    open: boolean;
    children: ReactNode;
    setOpen: (v: boolean) => void;
}
const shares = [shareList[1], shareList[2], shareList[3]];

const SharePopover: FC<ISharePopoverProps> = ({ open, setOpen, children, link, title, slug }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        resetAddVideoSharingAction()(dispatch);
    }, [dispatch]);

    const onSubmitShare = (): void => {
        dispatch(addVideoSharingAction(slug)).then((res) => {
            setOpen(false);
            if (res.type === 'sharings/add/fulfilled') {
                message.success('Merci de bien vouloir partagé cette video!');
            }
        });
    };

    return (
        <Popover
            visible={open}
            trigger="click"
            placement="topLeft"
            onVisibleChange={(v) => setOpen(v)}
            overlayClassName={styles.sharePopover}
            content={
                <div className="d-flex justify-content-between p-1">
                    {shares.map((share) => (
                        <SocialShare key={share.name} type={share.name as IShareType} link={link} title={title}>
                            <Button
                                shape="circle"
                                icon={share.icon}
                                onClick={onSubmitShare}
                                data-platform={share.name}
                                className={styles.sharePopover__button}
                            />
                        </SocialShare>
                    ))}
                </div>
            }
            className={styles.sharePopover}
        >
            {children}
        </Popover>
    );
};

export default SharePopover;
