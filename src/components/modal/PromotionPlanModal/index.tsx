import React, { FC, useEffect, useState } from 'react';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { Form, Modal } from 'antd';
import { IAdsPlanData, IStoryPlanData } from '@interfaces/promotion';
import { useAppDispatch } from '@redux/store';
import { IRootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import addAdsPlanAction, { resetAddAdsPlanAction } from '@redux/ads/addPlan';
import CreateModalHeader from '@components/common/CreateModalHeader';
import FormSuccessResult from '@components/common/FormSuccessResult';
import CreatePromotionForm from '@components/form/CreatePromotionForm';

import styles from './index.module.scss';

const { useForm } = Form;

export interface IPromotionModalProps {
    visible: boolean;
    reload?: () => void;
    type: 'ads' | 'story';
    formContext: EnumFormContext;
    setVisible: (val: boolean) => void;
    initialValues?: IAdsPlanData | IStoryPlanData;
}

const PromotionModal: FC<IPromotionModalProps> = ({
    type,
    visible,
    setVisible,
    formContext,
    initialValues,
    reload = () => {
        //
    },
}) => {
    const SUCCESS_CREATE = `La formule d'abonnement ${type} a été créée avec succès`;
    const SUCCESS_EDIT = `La formule d'abonnement ${type} a été modifiée avec succès`;

    const dispatch = useAppDispatch();
    const isEdit = formContext === EnumFormContext.EDIT;
    const { error, loading } = useSelector(({ ads: { addPlan } }: IRootState) => addPlan);

    const [form] = useForm();
    const [success, setSuccess] = useState<string>('');

    const onCloseModal = (): void => {
        setVisible(false);
        form.resetFields();
    };

    const onSubmitPromotion = (formData: IUnknownObject | IAdsPlanData | IStoryPlanData): void => {
        form.validateFields();
        dispatch(
            addAdsPlanAction({
                isEdit,
                data: isEdit ? ({ ...formData, id: initialValues?.id } as IAdsPlanData) : (formData as IAdsPlanData),
            }),
        ).then((res) => {
            if (['ads/addPlan/rejected', 'story/addPlan/rejected'].includes(res.type)) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            if (['ads/addPlan/fulfilled', 'story/addPlan/fulfilled'].includes(res.type)) {
                reload();
                setSuccess(isEdit ? SUCCESS_EDIT : SUCCESS_CREATE);
                form.resetFields();
            }
        });
    };

    useEffect(() => {
        if (visible) setSuccess('');
        resetAddAdsPlanAction()(dispatch);
    }, [dispatch, visible]);

    return (
        <Modal
            centered
            width={520}
            footer={null}
            destroyOnClose
            closable={false}
            visible={visible}
            className={styles.promotionModal}
            wrapClassName={styles.promotionModal__wrap}
            title={
                !success && (
                    <CreateModalHeader
                        context="plan"
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
                <CreatePromotionForm
                    error={error}
                    formRef={form}
                    formContext={formContext}
                    onSubmit={onSubmitPromotion}
                    initialValues={initialValues}
                />
            )}
        </Modal>
    );
};

export default PromotionModal;
