import React, { FC } from 'react';
import { Form, FormInstance, Input, Select } from 'antd';
import FloatTextInput from '@components/common/FloatTextInput';
import { categoryValidator, tagsValidator, titleValidator, userValidator } from './vaidators';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import ErrorAlert from '@components/common/ErrorAlert';
import { IVideoData } from '@interfaces/videos';

const { Item } = Form;

export interface ICreateVideoProps {
    error: Error | IUnknownObject | null;
    formRef: FormInstance<IVideoData>;
    onSubmit: (val: IVideoData) => void;
    initialValues?: IVideoData;
    formContext: EnumFormContext;
}

const CreateVideoForm: FC<ICreateVideoProps> = ({ onSubmit, formContext: _, formRef, error }) => {
    // const isEdit = formContext === EnumFormContext.EDIT; // for the default category
    const onSubmitArticle = (formData: IVideoData): void => {
        const { title, link, tags, userId, categoryId } = formData;
        return onSubmit({
            title,
            link,
            tags,
            userId,
            categoryId,
        });
    };

    return (
        <Form form={formRef} size="large" layout="vertical" onFinish={onSubmitArticle} name="create_video">
            <ErrorAlert error={error} closable banner showIcon />

            <Item name="title" validateTrigger={['onSubmit', 'onBlur']} rules={titleValidator('Titre')}>
                <FloatTextInput label="Titre" placeholder="Titre" required>
                    <Input size="large" maxLength={100} />
                </FloatTextInput>
            </Item>

            <Item name="link" validateTrigger={['onSubmit', 'onBlur']} rules={titleValidator('Lien')}>
                <FloatTextInput label="Titre" placeholder="Ex: https://www.youtube.com/watch?v=q1YVUO9D_MI" required>
                    <Input size="large" maxLength={100} />
                </FloatTextInput>
            </Item>

            <Item name="userId" validateTrigger={['onSubmit', 'onBlur']} rules={userValidator('Client')}>
                <Select size="large" placeholder="Sélectionner un client" />
            </Item>

            <Item name="categoryId" validateTrigger={['onSubmit', 'onBlur']} rules={categoryValidator('Catégorie')}>
                <Select size="large" placeholder="Sélectionner une catégorie" />
            </Item>

            <Item name="tags" validateTrigger={['onSubmit', 'onBlur']} rules={tagsValidator('Tags')}>
                <Select mode="tags" size="large" placeholder="Ex: kinshasa, music, hip-hop" maxTagCount="responsive" />
            </Item>
        </Form>
    );
};

export default CreateVideoForm;
