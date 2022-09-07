import React, { FC } from 'react';
import { IAdsPlanData, IStoryPlanData } from '@interfaces/promotion';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { Form, FormInstance, Input } from 'antd';
import ErrorAlert from '@components/common/ErrorAlert';
import FloatTextInput from '@components/common/FloatTextInput';
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

            <Item name="name" validateTrigger={['onSubmit', 'onBlur']} rules={nameValidator('Nom de la formule')}>
                <FloatTextInput label="Nom de la formule" placeholder="Nom de la formule" required>
                    <Input size="large" maxLength={20} />
                </FloatTextInput>
            </Item>

            <Item name="duration" validateTrigger={['onSubmit', 'onBlur']} rules={[required('Durée')]}>
                <FloatTextInput label="Durée (jours)" placeholder="Durée (jours)" required>
                    <Input type="number" size="large" min={15} max={365} />
                </FloatTextInput>
            </Item>

            <Item name="price" validateTrigger={['onSubmit', 'onBlur']} rules={[required('Prix')]}>
                <FloatTextInput label="Prix ($ USD)" placeholder="Prix ($ USD)" required>
                    <Input type="number" size="large" />
                </FloatTextInput>
            </Item>
        </Form>
    );
};

export default CreatePromotionForm;
