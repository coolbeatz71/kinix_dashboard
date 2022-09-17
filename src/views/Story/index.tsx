import React, { useState, useCallback, useEffect, Fragment, FC } from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import { LIMIT } from '@constants/app';
import getAllStoryAction from '@redux/story/getAll';
import getStoryOverviewAction from '@redux/story/overview';
import getAllStoryPlanAction from '@redux/story/plans';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import ServerError from '@components/common/ServerError';
import PageTitle from '@components/common/PageTitle';
import PromotionPlanModal from '@components/modal/PromotionPlanModal';
import { EnumFormContext } from '@interfaces/app';
import { IPromotionOverview } from '@interfaces/promotion';
import PromotionOverview from '@components/common/PromotionOverview';
import ListStoryPlan from '@components/tables/ListStoryPlan';
import ListStory from '@components/tables/ListStory';
import StoryModal from '@components/modal/StoryModal';

const Story: FC = () => {
    const dispatch = useAppDispatch();
    const [storyTitle, setStoryTitle] = useState<string>('Story');
    const [planTitle, setPlanTitle] = useState<string>("Formule d'abonnement");

    const { loading, data, error } = useSelector(({ story: { overview } }: IRootState) => overview);

    const [openAddStoryModal, setOpenAddStoryModal] = useState(false);
    const [openAddStoryPlanModal, setOpenAddStoryPlanModal] = useState(false);

    const [pagination] = useState({
        page: 1,
        limit: LIMIT,
        search: '',
    });

    const { page, limit, search } = pagination;

    const reloadPlan = (): void => {
        dispatch(getAllStoryPlanAction());
    };

    const reloadStory = (): void => {
        dispatch(
            getAllStoryAction({
                page,
                limit,
                search,
            }),
        );
    };

    const loadOverview = useCallback(() => {
        dispatch(getStoryOverviewAction());
    }, [dispatch]);

    useEffect(() => {
        loadOverview();
    }, [loadOverview]);

    return (
        <div>
            {error ? (
                <ServerError onRefresh={() => loadOverview()} />
            ) : (
                <Fragment>
                    <div className="mb-2">
                        <PromotionOverview loading={loading} overview={data as IPromotionOverview} />
                    </div>
                    <div className="mb-5">
                        <PageTitle title={planTitle}>
                            <Button
                                type="primary"
                                icon={<PlusCircleOutlined />}
                                onClick={() => setOpenAddStoryPlanModal(true)}
                            >
                                Ajouter
                            </Button>
                        </PageTitle>
                        <PromotionPlanModal
                            type="story"
                            reload={reloadPlan}
                            visible={openAddStoryPlanModal}
                            setVisible={setOpenAddStoryPlanModal}
                            formContext={EnumFormContext.CREATE}
                        />
                        <ListStoryPlan onTitle={(t) => setPlanTitle(t)} />
                    </div>
                    <div className="mt-5">
                        <PageTitle title={storyTitle}>
                            <Button
                                type="primary"
                                icon={<PlusCircleOutlined />}
                                onClick={() => setOpenAddStoryModal(true)}
                            >
                                Ajouter
                            </Button>
                        </PageTitle>
                        <StoryModal
                            reload={reloadStory}
                            visible={openAddStoryModal}
                            setVisible={setOpenAddStoryModal}
                            formContext={EnumFormContext.CREATE}
                        />
                        <ListStory onTitle={(t) => setStoryTitle(t)} />
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default Story;
