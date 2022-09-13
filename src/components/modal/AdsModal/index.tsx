import React, { FC, useState, useEffect } from 'react';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { Form, Modal } from 'antd';
import { IAdsData } from '@interfaces/promotion';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@redux/store';
import { IRootState } from '@redux/reducers';
import addAdsAction, { resetAddAdsAction } from '@redux/ads/add';
import CreateModalHeader from '@components/common/CreateModalHeader';
import getAllAdsPlanAction from '@redux/ads/plans';
import FormSuccessResult from '@components/common/FormSuccessResult';
import CreateAdsForm from '@components/form/CreateAdsForm';
import { IAds, IUser } from '@interfaces/api';

import styles from './index.module.scss';

const { useForm } = Form;

export interface IAdsModalProps {
    visible: boolean;
    reload?: () => void;
    formContext: EnumFormContext;
    setVisible: (val: boolean) => void;
    initialValues?: IAds;
}

const SUCCESS_CREATE = "L'Ads a été créée avec succès";
const SUCCESS_EDIT = "L'Ads a été modifiée avec succès";
const AdsModal: FC<IAdsModalProps> = ({
    visible,
    setVisible,
    formContext,
    initialValues,
    reload = () => {
        //
    },
}) => {
    const dispatch = useAppDispatch();
    const isEdit = formContext === EnumFormContext.EDIT;
    const { error, loading } = useSelector(({ ads: { add } }: IRootState) => add);

    const { data: plans, loading: loadingPlans } = useSelector(({ ads: { plans } }: IRootState) => plans);
    const { data: users, loading: loadingUsers } = useSelector(({ users: { search } }: IRootState) => search);

    const [form] = useForm();
    const [success, setSuccess] = useState<string>('');

    const onCloseModal = (): void => {
        setVisible(false);
        form.resetFields();
    };

    const onSubmitAds = (formData: IUnknownObject | IAdsData): void => {
        form.validateFields();
        dispatch(
            addAdsAction({
                isEdit,
                data: isEdit ? ({ ...formData, id: initialValues?.id } as IAdsData) : (formData as IAdsData),
            }),
        ).then((res) => {
            if (['ads/add/rejected', 'story/add/rejected'].includes(res.type)) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            if (['ads/add/fulfilled', 'story/add/fulfilled'].includes(res.type)) {
                reload();
                setSuccess(isEdit ? SUCCESS_EDIT : SUCCESS_CREATE);
                form.resetFields();
            }
        });
    };

    useEffect(() => {
        if (visible) setSuccess('');
        resetAddAdsAction()(dispatch);
        dispatch(getAllAdsPlanAction());
    }, [dispatch, visible]);

    return (
        <Modal
            centered
            width={520}
            footer={null}
            destroyOnClose
            closable={false}
            visible={visible}
            className={styles.adsModal}
            wrapClassName={styles.adsModal__wrap}
            title={
                !success && (
                    <CreateModalHeader
                        context="ads"
                        isEdit={isEdit}
                        loading={loading}
                        onCloseModal={onCloseModal}
                        onSubmit={() => form.submit()}
                    />
                )
            }
        >
            {success ? (
                <FormSuccessResult title={success} onClose={onCloseModal} />
            ) : (
                <CreateAdsForm
                    error={error}
                    formRef={form}
                    plans={plans?.rows}
                    onSubmit={onSubmitAds}
                    users={users as IUser[]}
                    formContext={formContext}
                    loadingUsers={loadingUsers}
                    loadingPlans={loadingPlans}
                    initialValues={initialValues}
                />
            )}
        </Modal>
    );
};

export default AdsModal;
