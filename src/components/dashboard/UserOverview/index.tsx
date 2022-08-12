import React, { FC } from 'react';
import { BellOutlined, TeamOutlined, UserSwitchOutlined, WifiOutlined } from '@ant-design/icons';
import { HiUsers } from 'react-icons/hi';
import { Card, Col, Row, Skeleton } from 'antd';
import { IUserOverview } from '@interfaces/overview';
import { FACEBOOK, GOOGLE, GRAY, LINK, PRIMARY, WARNING, YELLOW } from '@constants/colors';
import ShapePieChart from '@components/charts/ShapePieChart';
import OverviewGroupTitle from '@components/common/OverviewGroupTitle';
import OverviewTitle from '@components/common/OverviewTitle';
import { USER_PATH } from '@constants/paths';

import styles from './index.module.scss';

export interface IUserOverviewProps {
    loading: boolean;
    overview: IUserOverview;
}

const UserOverview: FC<IUserOverviewProps> = ({ loading, overview }) => {
    const groups = [
        {
            title: 'activité',
            icon: <WifiOutlined />,
            subTitle: `Activité d'utilisateurs selon qu'ils sont actuellement connectés ou hors ligne.`,
            data: [
                {
                    color: LINK,
                    name: 'En-ligne',
                    value: overview?.activity.active,
                },
                {
                    color: GRAY,
                    name: 'Hors-ligne',
                    value: overview?.activity.inactive,
                },
            ],
        },
        {
            title: 'origine compte',
            icon: <UserSwitchOutlined />,
            subTitle: `Aperçu des utilisateurs en fonction de l'origine (type) des détails de création de compte.`,
            data: [
                {
                    name: 'Local',
                    color: PRIMARY,
                    value: overview?.provider.local,
                },
                {
                    name: 'Facebook',
                    color: FACEBOOK,
                    value: overview?.provider.facebook,
                },
                {
                    name: 'Gmail',
                    color: GOOGLE,
                    value: overview?.provider.google,
                },
            ],
        },
        {
            icon: <TeamOutlined />,
            title: 'type de compte',
            subTitle: `Aperçu des utilisateurs en fonction du type de compte (rôle au sein de la plateforme).`,
            data: [
                {
                    name: 'Admins',
                    color: WARNING,
                    value: overview?.role.admin,
                },
                {
                    color: PRIMARY,
                    name: 'Super-admins',
                    value: overview?.role.superAdmin,
                },
                {
                    color: LINK,
                    name: 'Clients video',
                    value: overview?.role.video,
                },
                {
                    color: YELLOW,
                    name: 'Clients promotion',
                    value: overview?.role.admin,
                },
                {
                    color: GRAY,
                    name: 'Utilisateurs',
                    value: overview?.role.admin,
                },
            ],
        },
        {
            title: 'notification',
            icon: <BellOutlined />,
            subTitle: `Aperçu des utilisateurs en fonction de l'activation ou désactivation des notifications par e-mail.`,
            data: [
                {
                    color: LINK,
                    name: 'Activées',
                    value: overview?.notification.active,
                },
                {
                    color: GRAY,
                    name: 'Désactivées',
                    value: overview?.notification.inactive,
                },
            ],
        },
    ];
    return (
        <div className="mb-4 d-inline-block w-100">
            <OverviewTitle color={LINK} title="utilisateurs" icon={<HiUsers />} linkHasMore={USER_PATH} />
            <Card bordered hoverable className={styles.users}>
                <Row align="middle" justify="space-between" gutter={32}>
                    {groups.map((group) => (
                        <Col xs={24} sm={24} md={12} key={group.title} className="my-4">
                            <OverviewGroupTitle title={group.title} subTitle={group.subTitle} icon={group.icon} />
                            <Card bordered className={styles.users__container}>
                                {loading ? (
                                    <Skeleton.Button active size="large" block />
                                ) : (
                                    <ShapePieChart data={group.data} />
                                )}
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card>
        </div>
    );
};

export default UserOverview;
