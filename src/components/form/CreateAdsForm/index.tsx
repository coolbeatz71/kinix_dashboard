import React, { FC, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
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
    const [imgUploadError, setImgUploadError] = useState<string>('');
    const [uploadData, setUploadData] = useState<IUnknownObject>({
        file: [],
        image: null,
        uploadFile: null,
    });

    const onSubmitAds = (formData: IAdsData): void => {
        if (isEmpty(uploadData.file) && isEmpty(uploadData.image) && isEmpty(!uploadData.uploadFile)) {
            setImgUploadError('Photo ads est obligatoire');
        } else {
            console.log('image', uploadData.file, formData);
        }
        // onSubmit(formData);
    };

    const onImageCancel = (): void => {
        setUploadData({ file: [], image: null });
    };
    const onImageAccept = (image: Crop | null, file: File[], uploadFile: File): void => {
        setUploadData({ image, file, uploadFile });
    };

    useEffect(() => {
        setImgUploadError('');
    }, []);

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

            <Item label="Photo ads" required>
                <ImageCropper
                    onOk={onImageAccept}
                    onCancel={onImageCancel}
                    file={uploadData.file || []}
                    image={uploadData.image || null}
                    uploadHint="Selectionnez une image"
                    uploadFile={uploadData.uploadFile || null}
                />
                {imgUploadError && <small className="ant-form-item-explain-error">{imgUploadError}</small>}
            </Item>
        </Form>
    );
};

export default CreateAdsForm;
