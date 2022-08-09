import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '@redux/store';
import getOverviewAction from '@redux/overview/getOverview';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import GeneralOverview from '@components/dashboard/GeneralOverview';
import UserOverview from '@components/dashboard/UserOverview';

const Dashboard: FC = () => {
    const dispatch = useAppDispatch();
    const { error, loading, data } = useSelector(({ overview: { get } }: IRootState) => get);

    useEffect(() => {
        loadOverview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadOverview = (): void => {
        dispatch(getOverviewAction());
    };

    return (
        <div>
            <GeneralOverview loading={loading} error={error} overview={data?.general} reload={loadOverview} />
            <UserOverview loading={loading} error={error} overview={data?.users} reload={loadOverview} />
        </div>
    );
};

export default Dashboard;
