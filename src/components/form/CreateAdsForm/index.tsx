import React, { FC } from 'react';
import { DatePicker, Form, FormInstance, Input } from 'antd';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { IAdsData } from '@interfaces/promotion';
import ErrorAlert from '@components/common/ErrorAlert';
import FloatTextInput from '@components/common/FloatTextInput';
import {
    bodyValidator,
    legendValidator,
    redirectUrl,
    startDateValidator,
    subTitleValidator,
    titleValidator,
} from './validator';

const { Item } = Form;
const { TextArea } = Input;

export interface ICreateAdsFormProps {
    initialValues?: IAdsData;
    formContext: EnumFormContext;
    formRef: FormInstance<IAdsData>;
    onSubmit: (val: IAdsData) => void;
    error: Error | IUnknownObject | null;
}

const CreateAdsForm: FC<ICreateAdsFormProps> = ({ formContext, error, initialValues, formRef, onSubmit }) => {
    const textAreaStyle = { height: 120 };
    const isEdit = formContext === EnumFormContext.EDIT;

    const onSubmitAds = (formData: IAdsData): void => onSubmit(formData);

    return (
        <Form
            size="large"
            form={formRef}
            layout="vertical"
            name="create_plan"
            onFinish={onSubmitAds}
            initialValues={isEdit ? initialValues : {}}
        >
            <ErrorAlert error={error} closable banner showIcon />

            <Item name="title" validateTrigger={['onSubmit', 'onBlur']} rules={titleValidator('Titre')}>
                <FloatTextInput label="Titre" placeholder="Titre" required>
                    <Input size="large" maxLength={50} />
                </FloatTextInput>
            </Item>

            <Item name="subTitle" validateTrigger={['onSubmit', 'onBlur']} rules={subTitleValidator('Sous-titre')}>
                <FloatTextInput label="Sous-titre" placeholder="Sous-titre" required>
                    <Input size="large" maxLength={50} />
                </FloatTextInput>
            </Item>

            <Item name="legend" validateTrigger={['onSubmit', 'onBlur']} rules={legendValidator('Legend')}>
                <FloatTextInput label="Legend" placeholder="Legend" required>
                    <Input size="large" maxLength={20} />
                </FloatTextInput>
            </Item>

            <Item name="body" validateTrigger={['onSubmit', 'onBlur']} rules={bodyValidator('Description')}>
                <FloatTextInput label="Description" placeholder="Description" required>
                    <TextArea size="large" showCount autoSize={false} style={textAreaStyle} maxLength={250} />
                </FloatTextInput>
            </Item>
            <br />

            <Item
                name="redirectUrl"
                validateTrigger={['onSubmit', 'onBlur']}
                rules={redirectUrl('Lien de redirection')}
            >
                <FloatTextInput label="Lien de redirection" placeholder="Lien de redirection">
                    <Input size="large" />
                </FloatTextInput>
            </Item>

            <Item
                name="startDate"
                label="Date de lancement"
                validateTrigger={['onSubmit', 'onBlur']}
                rules={startDateValidator('Date de lancement')}
            >
                <DatePicker style={{ width: '100%' }} size="large" placeholder="Sélectionnez la date de lancement" />
            </Item>
        </Form>
    );
};

export default CreateAdsForm;
