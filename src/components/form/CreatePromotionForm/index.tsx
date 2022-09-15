import React, { FC } from 'react';
import { IAdsPlanData, IStoryPlanData } from '@interfaces/promotion';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { Form, FormInstance, Input } from 'antd';
import ErrorAlert from '@components/common/ErrorAlert';
import { nameValidator } from './validators';
import { required } from '@helpers/validators';

const { Item } = Form;

export interface ICreatePromotionFormProps {
    formContext: EnumFormContext;
    error: Error | IUnknownObject | null;
    initialValues?: IAdsPlanData | IStoryPlanData;
    formRef: FormInstance<IAdsPlanData | IStoryPlanData>;
    onSubmit: (val: IAdsPlanData | IStoryPlanData) => void;
}

const CreatePromotionForm: FC<ICreatePromotionFormProps> = ({
    error,
    formRef,
    onSubmit,
    formContext,
    initialValues,
}) => {
    const isEdit = formContext === EnumFormContext.EDIT;

    const onSubmitPromotion = (formData: IAdsPlanData | IStoryPlanData): void => onSubmit(formData);

    return (
        <Form
            size="large"
            form={formRef}
            layout="vertical"
            name="create_plan"
            onFinish={onSubmitPromotion}
            initialValues={isEdit ? initialValues : {}}
        >
            <ErrorAlert error={error} closable banner showIcon />

            <Item
                name="name"
                label="Nom de la formule"
                validateTrigger={['onSubmit', 'onBlur']}
                rules={nameValidator('Nom de la formule')}
            >
                <Input size="large" maxLength={20} placeholder="Nom de la formule" />
            </Item>

            <Item name="duration" label="Durée" rules={[required('Durée')]} validateTrigger={['onSubmit', 'onBlur']}>
                <Input type="number" placeholder="Durée (jours)" size="large" min={15} max={365} />
            </Item>

            <Item name="price" label="Prix" validateTrigger={['onSubmit', 'onBlur']} rules={[required('Prix')]}>
                <Input type="number" placeholder="Prix ($ USD)" size="large" />
            </Item>
        </Form>
    );
};

export default CreatePromotionForm;
