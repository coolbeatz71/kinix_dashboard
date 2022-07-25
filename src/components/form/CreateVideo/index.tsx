import React, { FC, useEffect } from 'react';
import { Form, FormInstance, Input, Select } from 'antd';
import FloatTextInput from '@components/common/FloatTextInput';
import { categoryValidator, tagsValidator, titleValidator, userValidator } from './validators';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import ErrorAlert from '@components/common/ErrorAlert';
import { IVideoData } from '@interfaces/videos';
import { ICategory, IUser } from '@interfaces/api';
import { useAppDispatch } from '@redux/store';
import searchUsersAction from '@redux/users/searchUsers';
import useRouteQuery from '@hooks/useRouteQuery';
import format from '@helpers/formatString';

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
    formContext,
    formRef,
    error,
    categories,
    users,
    loadingCategories,
    loadingUsers,
}) => {
    const query = useRouteQuery();
    const dispatch = useAppDispatch();
    const category = query.get('category');
    const isEdit = formContext === EnumFormContext.EDIT;

    const onSubmitArticle = (formData: IVideoData): void => onSubmit(formData);

    useEffect(() => {
        if (!isEdit) {
            const initCategory = categories?.find((cat) => cat.name === category?.toUpperCase());
            formRef.setFieldsValue({
                categoryId: {
                    value: initCategory?.id,
                    label: format(initCategory?.name, 'upper-lowercase'),
                },
            });
        }
    }, [categories, category, formRef, isEdit]);

    const handleSearchUser = (value: string): void => {
        if (value) dispatch(searchUsersAction({ search: value }));
    };

    const usersOptions = users?.map((user) => ({
        value: user.id,
        label: `<span data-username>${user.userName}</span><span data-email>${user.email}</span>`,
    }));
    const categoriesOptions = categories?.map((cat) => ({
        value: cat.id,
        label: format(cat.name, 'upper-lowercase'),
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
                    <Select
                        showSearch
                        size="large"
                        filterOption={false}
                        notFoundContent={null}
                        loading={loadingUsers}
                        options={usersOptions}
                        onSearch={handleSearchUser}
                        defaultActiveFirstOption={false}
                    />
                </FloatTextInput>
            </Item>

            <Item name="categoryId" validateTrigger={['onSubmit', 'onBlur']} rules={categoryValidator('Catégorie')}>
                <FloatTextInput label="Client" placeholder="Sélectionner une catégorie" required>
                    <Select
                        size="large"
                        filterOption={false}
                        options={categoriesOptions}
                        disabled={loadingCategories}
                        loading={loadingCategories}
                        defaultActiveFirstOption={false}
                    />
                </FloatTextInput>
            </Item>

            <Item name="tags" validateTrigger={['onSubmit', 'onBlur']} rules={tagsValidator('Tags')}>
                <Select mode="tags" size="large" placeholder="Ex: kinshasa, music, hip-hop" maxTagCount="responsive" />
            </Item>
        </Form>
    );
};

export default CreateVideoForm;
