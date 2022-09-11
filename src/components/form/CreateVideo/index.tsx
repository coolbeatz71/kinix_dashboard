import React, { FC, useEffect } from 'react';
import { Button, Form, FormInstance, Input, Select } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { categoryValidator, linkValidator, tagsValidator, titleValidator, userValidator } from './validators';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import ErrorAlert from '@components/common/ErrorAlert';
import { IVideoData } from '@interfaces/videos';
import { ICategory, IUser, IVideo } from '@interfaces/api';
import { useAppDispatch } from '@redux/store';
import searchUsersAction from '@redux/users/search';
import useRouteQuery from '@hooks/useRouteQuery';
import format from '@helpers/formatString';
import VideoPlayerModal from '@components/modal/VideoPlayerModal';

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
        if (!isEdit && category) {
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

            <Item name="title" label="Titre" validateTrigger={['onSubmit', 'onBlur']} rules={titleValidator('Titre')}>
                <Input size="large" placeholder="Titre" maxLength={100} />
            </Item>

            <Item name="link" label="Lien video" validateTrigger={['onSubmit', 'onBlur']} rules={linkValidator('Lien')}>
                <Input
                    size="large"
                    maxLength={500}
                    placeholder="Ex: https://www.youtube.com/watch?v=q1YVUO9D_MI"
                    suffix={
                        <VideoPlayerModal url={videoLink}>
                            <Button
                                size="small"
                                type="link"
                                icon={<PlayCircleOutlined />}
                                className="d-flex justify-content-end"
                            />
                        </VideoPlayerModal>
                    }
                />
            </Item>

            <Item name="userId" label="Client" validateTrigger={['onSubmit', 'onBlur']} rules={userValidator('Client')}>
                <Select
                    showSearch
                    size="large"
                    filterOption={false}
                    notFoundContent={null}
                    loading={loadingUsers}
                    options={usersOptions}
                    onSearch={handleSearchUser}
                    defaultActiveFirstOption={false}
                    placeholder="Sélectionner un client"
                />
            </Item>

            <Item
                name="categoryId"
                label="Categorie"
                rules={categoryValidator('Catégorie')}
                validateTrigger={['onSubmit', 'onBlur']}
            >
                <Select
                    size="large"
                    filterOption={false}
                    options={categoriesOptions}
                    loading={loadingCategories}
                    disabled={loadingCategories}
                    defaultActiveFirstOption={false}
                    placeholder="Sélectionner une catégorie"
                />
            </Item>

            <Item name="lyrics" label="Lyrics" validateTrigger={['onSubmit', 'onBlur']}>
                <TextArea
                    size="large"
                    autoSize={false}
                    style={textAreaStyle}
                    placeholder="Lyrics pour les clip videos"
                />
            </Item>

            <Item name="tags" label="Mots clés" validateTrigger={['onSubmit', 'onBlur']} rules={tagsValidator('Tags')}>
                <Select mode="tags" size="large" placeholder="Ex: kinshasa, music, hip-hop" maxTagCount="responsive" />
            </Item>
        </Form>
    );
};

export default CreateVideoForm;
