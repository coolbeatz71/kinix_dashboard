import React, { FC } from 'react';
import { Form, FormInstance, Input, Select } from 'antd';
import FloatTextInput from '@components/common/FloatTextInput';
import { categoryValidator, tagsValidator, titleValidator, userValidator } from './vaidators';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import ErrorAlert from '@components/common/ErrorAlert';
import { IVideoData } from '@interfaces/videos';
import { ICategory, IUser } from '@interfaces/api';
import { useAppDispatch } from '@redux/store';
import searchUsersAction from '@redux/users/searchUsers';

const { Item } = Form;

export interface ICreateVideoProps {
    error: Error | IUnknownObject | null;
    formRef: FormInstance<IVideoData>;
    onSubmit: (val: IVideoData) => void;
    initialValues?: IVideoData;
    formContext: EnumFormContext;
    users?: IUser[];
    categories?: ICategory[];
    loadingUsers: boolean;
    loadingCategories: boolean;
}

const CreateVideoForm: FC<ICreateVideoProps> = ({
    onSubmit,
    formContext: _,
    formRef,
    error,
    categories,
    users,
    loadingCategories,
    loadingUsers,
}) => {
    const dispatch = useAppDispatch();
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

    const handleSearchUser = (value: string): void => {
        if (value) dispatch(searchUsersAction({ search: value }));
    };

    console.log('users', users);

    const options = users?.map((user) => ({
        value: user.id,
        label: `${user.userName} - ${user.email}`,
    }));

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
                <FloatTextInput label="Client" placeholder="Sélectionner un client" required>
                    <Select size="large" options={options} showSearch onSearch={handleSearchUser} />
                </FloatTextInput>
            </Item>

            <Item name="categoryId" validateTrigger={['onSubmit', 'onBlur']} rules={categoryValidator('Catégorie')}>
                <FloatTextInput label="Client" placeholder="Sélectionner une catégorie" required>
                    <Select size="large" loading={loadingCategories} />
                </FloatTextInput>
            </Item>

            <Item name="tags" validateTrigger={['onSubmit', 'onBlur']} rules={tagsValidator('Tags')}>
                <Select mode="tags" size="large" placeholder="Ex: kinshasa, music, hip-hop" maxTagCount="responsive" />
            </Item>
        </Form>
    );
};

export default CreateVideoForm;
