import React, { FC } from 'react';
import { Avatar, Col, Menu, Row, Typography, Spin, notification } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, LoadingOutlined } from '@ant-design/icons';
import { getAvatarColor } from '@helpers/getAvatarColor';

import styles from './index.module.scss';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import logoutAction from '@redux/auth/logout';
import { useAppDispatch } from '@redux/store';

const { Item } = Menu;
const { Text } = Typography;

export interface IUserProfileMenuProps {
    avatar?: string | null;
    email: string;
    userName: string;
    phoneNumber: string;
    setOpenDropdown: (val: boolean) => void;
}

const UserProfileMenu: FC<IUserProfileMenuProps> = ({ avatar, email, phoneNumber, userName, setOpenDropdown }) => {
    const { error, loading } = useSelector(({ auth: { logout } }: IRootState) => logout);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (error) {
            notification.error({
                key: 'error',
                maxCount: 1,
                message: 'Erreur',
                description: error?.message,
                placement: 'bottomRight',
            });
        }
    }, [error]);

    const onLogout = (): void => {
        dispatch(logoutAction({ dispatch })).then((res) => {
            if (res.type === 'auth/logout/fulfilled') {
                setOpenDropdown(false);
            }
        });
    };

    return (
        <Menu className={styles.profile}>
            <Row align="middle" justify="center">
                <Col span={24} className={styles.profile__avatar}>
                    <Avatar
                        size={98}
                        src={avatar}
                        icon={<UserOutlined />}
                        style={{ backgroundColor: getAvatarColor(userName) }}
                    />
                </Col>
                <Col span={24} className="text-center my-3">
                    <Text strong>{email}</Text>
                    <br />
                    <Text data-phone>{phoneNumber}</Text>
                </Col>
            </Row>
            <Item icon={<SettingOutlined />}>Configuration</Item>
            <Item danger data-signout icon={<LogoutOutlined />} onClick={onLogout}>
                {loading ? <Spin indicator={<LoadingOutlined />} /> : 'Déconnexion'}
            </Item>
        </Menu>
    );
};

export default UserProfileMenu;
