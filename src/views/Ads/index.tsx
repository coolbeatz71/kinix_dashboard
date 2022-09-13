import React, { FC, Fragment, useState } from 'react';
import { LIMIT } from '@constants/app';
import { Button } from 'antd';
import PageTitle from '@components/common/PageTitle';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@redux/store';
import getAllAdsPlanAction from '../../redux/ads/plans';
import ListAdsPlan from '@components/tables/ListAdsPlan';
import getAllAdsAction from '@redux/ads/getAll';
import { EnumFormContext } from '@interfaces/app';
import PromotionPlanModal from '@components/modal/PromotionPlanModal';
import ListAds from '@components/tables/ListAds';
import AdsModal from '@components/modal/AdsModal';

const Ads: FC = () => {
    const dispatch = useAppDispatch();
    const [adsTitle, setAdsTitle] = useState<string>('Ads');
    const [planTitle, setPlanTitle] = useState<string>("Formule d'abonnement");

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

    return (
        <div>
            <Fragment>
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
                        <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddAdsModal(true)}>
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
        </div>
    );
};

export default Ads;
