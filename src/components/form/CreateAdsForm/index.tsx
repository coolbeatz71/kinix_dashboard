import React, { FC, useState } from 'react';
import { Crop } from 'react-image-crop';
import { DatePicker, Form, FormInstance, Input } from 'antd';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { IAdsData } from '@interfaces/promotion';
import ErrorAlert from '@components/common/ErrorAlert';
import {
    bodyValidator,
    legendValidator,
    redirectUrl,
    startDateValidator,
    subTitleValidator,
    titleValidator,
} from './validator';
import ImageCropper from '@components/common/ImageCropper';

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
    const [imageData, setImageData] = useState<IUnknownObject>({
        file: [],
        image: null,
        uploadFile: null,
    });

    const onSubmitAds = (formData: IAdsData): void => onSubmit(formData);

    const onImageCancel = (): void => {
        setImageData({ file: [], image: null });
    };
    const onImageAccept = (image: Crop | null, file: File[], uploadFile: File): void => {
        setImageData({ image, file, uploadFile });
    };

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

            <Item name="title" label="Titre" validateTrigger={['onSubmit', 'onBlur']} rules={titleValidator('Titre')}>
                <Input size="large" maxLength={50} placeholder="Titre" />
            </Item>

            <Item
                name="subTitle"
                label="Sous-titre"
                rules={subTitleValidator('Sous-titre')}
                validateTrigger={['onSubmit', 'onBlur']}
            >
                <Input size="large" maxLength={50} placeholder="Sous-titre" />
            </Item>

            <Item
                name="legend"
                label="Legend"
                rules={legendValidator('Legend')}
                validateTrigger={['onSubmit', 'onBlur']}
            >
                <Input size="large" maxLength={20} placeholder="Ex: people, actualité, concert, publicité, etc." />
            </Item>

            <Item
                name="body"
                label="Description"
                rules={bodyValidator('Description')}
                validateTrigger={['onSubmit', 'onBlur']}
            >
                <TextArea
                    showCount
                    size="large"
                    maxLength={250}
                    autoSize={false}
                    style={textAreaStyle}
                    placeholder="Ecrire quelque chose sur l'ads"
                />
            </Item>
            <br />

            <Item
                name="startDate"
                label="Date de lancement"
                validateTrigger={['onSubmit', 'onBlur']}
                rules={startDateValidator('Date de lancement')}
            >
                <DatePicker size="large" placeholder="Sélectionnez la date de lancement" />
            </Item>

            <Item
                name="redirectUrl"
                label="Lien de redirection"
                validateTrigger={['onSubmit', 'onBlur']}
                rules={redirectUrl('Lien de redirection')}
            >
                <Input size="large" placeholder="Lien de redirection" />
            </Item>

            <Item label="Photo ads">
                <ImageCropper
                    onOk={onImageAccept}
                    onCancel={onImageCancel}
                    file={imageData.file || []}
                    image={imageData.image || null}
                    uploadHint="Selectionnez une image"
                    uploadFile={imageData.uploadFile || null}
                />
            </Item>
        </Form>
    );
};

export default CreateAdsForm;
