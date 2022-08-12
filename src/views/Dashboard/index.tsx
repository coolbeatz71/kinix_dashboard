import React, { FC, Fragment, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@redux/store';
import getOverviewAction from '@redux/overview/getOverview';
import { IRootState } from '@redux/reducers';
import GeneralOverview from '@components/dashboard/GeneralOverview';
import UserOverview from '@components/dashboard/UserOverview';
import ServerError from '@components/common/ServerError';
import ArticleOverview from '@components/dashboard/ArticleOverview';
import VideoOverview from '@components/dashboard/VideoOverview';

const Dashboard: FC = () => {
    const dispatch = useAppDispatch();
    const { loading, data, error } = useSelector(({ overview: { get } }: IRootState) => get);

    const loadOverview = useCallback(() => {
        dispatch(getOverviewAction());
    }, [dispatch]);

    useEffect(() => {
        loadOverview();
    }, [loadOverview]);

    return (
        <Fragment>
            {error ? (
                <ServerError onRefresh={() => loadOverview()} />
            ) : (
                <Fragment>
                    <GeneralOverview loading={loading} overview={data?.general} />
                    <UserOverview loading={loading} overview={data?.users} />
                    <ArticleOverview loading={loading} overview={data?.articles} />
                    <VideoOverview loading={loading} overview={data?.videos} />
                </Fragment>
            )}
        </Fragment>
    );
};

export default Dashboard;
