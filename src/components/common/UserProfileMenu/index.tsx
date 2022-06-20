import React, { FC } from 'react';
import { Avatar, Col, Menu, Row, Typography } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { getAvatarColor } from '@helpers/getAvatarColor';

import styles from './index.module.scss';

const { Item } = Menu;
const { Text } = Typography;

export interface IUserProfileMenuProps {
    avatar?: string | null;
    email: string;
    userName: string;
    phoneNumber: string;
}

const UserProfileMenu: FC<IUserProfileMenuProps> = ({ avatar, email, phoneNumber, userName }) => {
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
            <Item data-signout icon={<LogoutOutlined />}>
                Déconnexion
            </Item>
        </Menu>
    );
};

export default UserProfileMenu;
