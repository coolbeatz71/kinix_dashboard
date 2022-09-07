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

const Ads: FC = () => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState<string>('Ads');
    const [planTitle, setPlanTitle] = useState<string>("Formule d'abonnement");
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
                <div>
                    <PageTitle title={planTitle}>
                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            onClick={() => setOpenAddAdsPlanModal(true)}
                        >
                            Ajouter
                        </Button>
                    </PageTitle>

                    <ListAdsPlan onTitle={(t) => setPlanTitle(t)} />
                </div>
                <div></div>
            </Fragment>

            <PromotionPlanModal
                type="ads"
                reload={reloadPlan}
                visible={openAddAdsPlanModal}
                setVisible={setOpenAddAdsPlanModal}
                formContext={EnumFormContext.CREATE}
            />
        </div>
    );
};

export default Ads;
