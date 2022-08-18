import React, { FC, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import getCurrentUserAction from '@redux/users/getCurrentUser';
import { useHistory } from 'react-router-dom';
import { Button, Card, Col, Row } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import PageTitle from '@components/common/PageTitle';
import AvatarCard from '@components/common/AvatarCard';

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
            <Card className="p-2" bordered>
                <Row justify="space-between">
                    <Col xs={24} sm={12}>
                        <AvatarCard loading={loading} image={user?.image} userName={user?.userName} />
                    </Col>
                    <Col xs={24} sm={12}>
                        lol
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default AccountSettings;
