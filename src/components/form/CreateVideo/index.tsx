import React, { FC, useEffect } from 'react';
import { Button, Form, FormInstance, Input, Select } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import FloatTextInput from '@components/common/FloatTextInput';
import { categoryValidator, linkValidator, tagsValidator, titleValidator, userValidator } from './validators';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import ErrorAlert from '@components/common/ErrorAlert';
import { IVideoData } from '@interfaces/videos';
import { ICategory, IUser, IVideo } from '@interfaces/api';
import { useAppDispatch } from '@redux/store';
import searchUsersAction from '@redux/users/search';
import useRouteQuery from '@hooks/useRouteQuery';
import format from '@helpers/formatString';
import VideoPlayer from '@components/common/VideoPlayer';

const { TextArea } = Input;
const { Item, useWatch } = Form;

export interface ICreateVideoProps {
    users?: IUser[];
    loadingUsers: boolean;
    categories?: ICategory[];
    initialValues?: IVideo;
    loadingCategories: boolean;
    formContext: EnumFormContext;
    formRef: FormInstance<IVideoData>;
    onSubmit: (val: IVideoData) => void;
    error: Error | IUnknownObject | null;
}

const CreateVideoForm: FC<ICreateVideoProps> = ({
    error,
    users,
    formRef,
    onSubmit,
    categories,
    formContext,
    loadingUsers,
    loadingCategories,
    initialValues,
}) => {
    const query = useRouteQuery();
    const dispatch = useAppDispatch();
    const textAreaStyle = { height: 150 };
    const category = query.get('category');
    const videoLink = useWatch('link', formRef);
    const isEdit = formContext === EnumFormContext.EDIT;
    const onSubmitArticle = (formData: IVideoData): void => onSubmit(formData);

    useEffect(() => {
        if (isEdit) handleSearchUser(initialValues?.user?.userName);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, initialValues]);

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

    const handleSearchUser = (value: string | undefined): void => {
        if (value) dispatch(searchUsersAction({ search: value }));
    };

    const usersOptions = users?.map((user) => ({
        value: user.id,
        label: (
            <div className="d-flex justify-content-between">
                <strong>{user.userName}</strong>
                <span className="text-muted">{user.email}</span>
            </div>
        ),
    }));
    const categoriesOptions = categories?.map((cat) => ({
        value: cat.id,
        label: format(cat.name, 'upper-lowercase'),
    }));

    return (
        <Form
            size="large"
            form={formRef}
            layout="vertical"
            name="create_video"
            onFinish={onSubmitArticle}
            initialValues={isEdit ? initialValues : {}}
        >
            <ErrorAlert error={error} closable banner showIcon />

            <Item name="title" validateTrigger={['onSubmit', 'onBlur']} rules={titleValidator('Titre')}>
                <FloatTextInput label="Titre" placeholder="Titre" required>
                    <Input size="large" maxLength={100} />
                </FloatTextInput>
            </Item>

            <Item name="link" validateTrigger={['onSubmit', 'onBlur']} rules={linkValidator('Lien')}>
                <FloatTextInput
                    required
                    label="Lien video"
                    placeholder="Ex: https://www.youtube.com/watch?v=q1YVUO9D_MI"
                >
                    <Input
                        size="large"
                        maxLength={500}
                        suffix={
                            <VideoPlayer url={videoLink}>
                                <Button
                                    size="small"
                                    type="link"
                                    icon={<PlayCircleOutlined />}
                                    className="d-flex justify-content-end"
                                />
                            </VideoPlayer>
                        }
                    />
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
                <FloatTextInput label="Categorie" placeholder="Sélectionner une catégorie" required>
                    <Select
                        size="large"
                        filterOption={false}
                        options={categoriesOptions}
                        loading={loadingCategories}
                        disabled={loadingCategories}
                        defaultActiveFirstOption={false}
                    />
                </FloatTextInput>
            </Item>

            <Item name="lyrics" validateTrigger={['onSubmit', 'onBlur']}>
                <FloatTextInput label="Lyrics" placeholder="Lyrics pour les clip videos" required>
                    <TextArea size="large" autoSize={false} style={textAreaStyle} />
                </FloatTextInput>
            </Item>

            <Item name="tags" validateTrigger={['onSubmit', 'onBlur']} rules={tagsValidator('Tags')}>
                <Select mode="tags" size="large" placeholder="Ex: kinshasa, music, hip-hop" maxTagCount="responsive" />
            </Item>
        </Form>
    );
};

export default CreateVideoForm;
