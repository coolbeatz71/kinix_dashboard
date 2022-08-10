import React, { FC } from 'react';
import { BellOutlined, TeamOutlined, UserSwitchOutlined, WifiOutlined } from '@ant-design/icons';
import { upperFirst } from 'lodash';
import { Card, Col, Divider, Row, Typography } from 'antd';
import { IUserOverview } from '@interfaces/overview';
import { ERROR, FACEBOOK, GOOGLE, GRAY, PRIMARY, SUCCESS, WARNING, YELLOW } from '@constants/colors';

import styles from './index.module.scss';

const { Title, Text } = Typography;

export interface IUserOverviewProps {
    loading: boolean;
    overview: IUserOverview;
}

const UserOverview: FC<IUserOverviewProps> = ({ loading, overview }) => {
    const groups = [
        {
            title: 'activité',
            icon: <WifiOutlined />,
            subTitle: `Aperçu de l'activité des utilisateurs selon qu'ils sont actuellement connectés ou hors ligne.`,
            data: [
                {
                    color: SUCCESS,
                    name: 'en-ligne',
                    values: overview?.activity.active,
                },
                {
                    color: GRAY,
                    name: 'hors-ligne',
                    values: overview?.activity.inactive,
                },
            ],
        },
        {
            title: 'origine compte',
            subTitle: `Aperçu des utilisateurs en fonction de l'origine (type) des détails de création de compte.`,
            icon: <UserSwitchOutlined />,
            data: [
                {
                    name: 'local',
                    color: PRIMARY,
                    values: overview?.provider.local,
                },
                {
                    name: 'facebook',
                    color: FACEBOOK,
                    values: overview?.provider.facebook,
                },
                {
                    name: 'gmail',
                    color: GOOGLE,
                    values: overview?.provider.google,
                },
            ],
        },
        {
            title: 'type de compte',
            subTitle: `Aperçu des utilisateurs en fonction du type de compte (rôle au sein de la plateforme).`,
            icon: <TeamOutlined />,
            data: [
                {
                    name: 'admins',
                    color: WARNING,
                    values: overview?.role.admin,
                },
                {
                    color: PRIMARY,
                    name: 'super-admins',
                    values: overview?.role.superAdmin,
                },
                {
                    color: ERROR,
                    name: 'clients video',
                    values: overview?.role.video,
                },
                {
                    color: YELLOW,
                    name: 'clients promotion',
                    values: overview?.role.admin,
                },
                {
                    color: GRAY,
                    name: 'utilisateurs',
                    values: overview?.role.admin,
                },
            ],
        },
        {
            title: 'notification',
            icon: <BellOutlined />,
            subTitle: `Aperçu des utilisateurs en fonction de l'activation ou désactivation des notifications par e-mail.`,
            data: [
                {
                    color: SUCCESS,
                    name: 'actifs',
                    values: overview?.notification.active,
                },
                {
                    color: GRAY,
                    name: 'inactifs',
                    values: overview?.notification.inactive,
                },
            ],
        },
    ];
    return (
        <Card bordered hoverable className={styles.users}>
            <Row align="middle" justify="space-between" gutter={32}>
                {groups.map((group) => (
                    <Col xs={24} sm={24} md={12} key={group.title}>
                        <Row justify="space-between" align="middle" data-title>
                            <Col span={24} className="d-flex align-items-center title">
                                {group.icon}
                                <Title level={4}>{upperFirst(group.title)}</Title>
                            </Col>
                            <Divider />
                            <Col span={24}>
                                <Text>{group.subTitle}</Text>
                            </Col>
                        </Row>
                        <Card bordered className={styles.users__container}>
                            lol
                        </Card>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default UserOverview;
