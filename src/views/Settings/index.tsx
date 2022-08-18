import React, { FC, useEffect } from 'react';
import { Button, Col, Row } from 'antd';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { RollbackOutlined } from '@ant-design/icons';
import PageTitle from '@components/common/PageTitle';
import AvatarCard from '@components/common/AvatarCard';
import UpdateAccountForm from '@components/form/UpdateAccount';
import getCurrentUserAction from '@redux/users/getCurrentUser';
import ChangePasswordForm from '@components/form/ChangePassword';

const AccountSettings: FC = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { data: user, loading } = useSelector(({ users }: IRootState) => users?.currentUser);

    useEffect(() => {
        if (isEmpty(user)) dispatch(getCurrentUserAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div>
            <PageTitle title="Configuration">
                <Button danger type="primary" icon={<RollbackOutlined />} onClick={() => history.goBack()}>
                    Retour
                </Button>
            </PageTitle>
            <Row justify="space-between" gutter={24}>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <AvatarCard loading={loading} image={user?.image} userName={user?.userName} />
                    <ChangePasswordForm />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <UpdateAccountForm />
                </Col>
            </Row>
        </div>
    );
};

export default AccountSettings;
