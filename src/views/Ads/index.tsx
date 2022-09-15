import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import { LIMIT } from '@constants/app';
import { useSelector } from 'react-redux';
import PageTitle from '@components/common/PageTitle';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@redux/store';
import getAllAdsPlanAction from '@redux/ads/plans';
import ListAdsPlan from '@components/tables/ListAdsPlan';
import getAllAdsAction from '@redux/ads/getAll';
import { EnumFormContext } from '@interfaces/app';
import PromotionPlanModal from '@components/modal/PromotionPlanModal';
import ListAds from '@components/tables/ListAds';
import AdsModal from '@components/modal/AdsModal';
import PromotionOverview from '@components/common/PromotionOverview';
import { IRootState } from '@redux/reducers';
import ServerError from '@components/common/ServerError';
import getAdsOverviewAction from '@redux/ads/overview';
import { IPromotionOverview } from '@interfaces/promotion';

const Ads: FC = () => {
    const dispatch = useAppDispatch();
    const [adsTitle, setAdsTitle] = useState<string>('Ads');
    const [planTitle, setPlanTitle] = useState<string>("Formule d'abonnement");

    const { loading, data, error } = useSelector(({ ads: { overview } }: IRootState) => overview);

    const [openAddAdsModal, setOpenAddAdsModal] = useState(false);
    const [openAddAdsPlanModal, setOpenAddAdsPlanModal] = useState(false);

    const [pagination] = useState({
        page: 1,
        limit: LIMIT,
        search: '',
    });

    const { page, limit, search } = pagination;

    const reloadPlan = (): void => {
        dispatch(getAllAdsPlanAction());
    };

    const reloadAds = (): void => {
        dispatch(
            getAllAdsAction({
                page,
                limit,
                search,
            }),
        );
    };

    const loadOverview = useCallback(() => {
        dispatch(getAdsOverviewAction());
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
                                onClick={() => setOpenAddAdsPlanModal(true)}
                            >
                                Ajouter
                            </Button>
                        </PageTitle>
                        <PromotionPlanModal
                            type="ads"
                            reload={reloadPlan}
                            visible={openAddAdsPlanModal}
                            setVisible={setOpenAddAdsPlanModal}
                            formContext={EnumFormContext.CREATE}
                        />
                        <ListAdsPlan onTitle={(t) => setPlanTitle(t)} />
                    </div>
                    <div className="mt-5">
                        <PageTitle title={adsTitle}>
                            <Button
                                type="primary"
                                icon={<PlusCircleOutlined />}
                                onClick={() => setOpenAddAdsModal(true)}
                            >
                                Ajouter
                            </Button>
                        </PageTitle>
                        <AdsModal
                            reload={reloadAds}
                            visible={openAddAdsModal}
                            setVisible={setOpenAddAdsModal}
                            formContext={EnumFormContext.CREATE}
                        />
                        <ListAds onTitle={(t) => setAdsTitle(t)} />
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default Ads;
