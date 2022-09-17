import React, { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { Form, FormInstance, Input, notification, Select } from 'antd';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { IStoryData } from '@interfaces/promotion';
import ErrorAlert from '@components/common/ErrorAlert';
import {
    bodyValidator,
    legendValidator,
    planValidator,
    redirectUrl,
    startDateValidator,
    subTitleValidator,
    titleValidator,
    userValidator,
} from './validator';
import uploadImageCloudinary from '@services/cloudinary';
import { useAppDispatch } from '@redux/store';
import searchUsersAction from '@redux/users/search';
import { IStory, IStoryPlan, IUser } from '@interfaces/api';
import format from '@helpers/formatString';
import AppDatePicker from '@components/common/AppDatePicker';
import FileUploader from '@components/common/FileUploader';
import { useDropzone } from 'react-dropzone';

const { Item } = Form;
const { TextArea } = Input;

export interface ICreateStoryFormProps {
    users?: IUser[];
    plans?: IStoryPlan[];
    loadingPlans: boolean;
    loadingUsers: boolean;
    initialValues?: IStory;
    formContext: EnumFormContext;
    formRef: FormInstance<IStoryData>;
    onSubmit: (val: IStoryData) => void;
    error: Error | IUnknownObject | null;
    setUploadingMedia: (val: boolean) => void;
}

const CreateStoryForm: FC<ICreateStoryFormProps> = ({
    error,
    plans,
    users,
    formRef,
    onSubmit,
    formContext,
    loadingUsers,
    loadingPlans,
    initialValues,
    setUploadingMedia,
}) => {
    const dispatch = useAppDispatch();
    const textAreaStyle = { height: 120 };
    const isEdit = formContext === EnumFormContext.EDIT;
    const [mediaUploadErr, setMediaUploadErr] = useState<string>('');

    const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
        maxFiles: 1,
        multiple: false,
        maxSize: 20240000,
        accept: { 'image/*': [], 'video/*': [] },
        onDropAccepted: (files: File[]) => setFile(files),
    });

    const [file, setFile] = useState<File[]>([]);
    const [media, setMedia] = useState<string | null | undefined>(initialValues?.media);

    const onSubmitStory = async (formData: IStoryData): Promise<void> => {
        const isNoMedia = isEmpty(file) && isEmpty(media);
        if (isNoMedia) setMediaUploadErr('Media story est obligatoire');
        else if (!isEmpty(file)) {
            // upload a new file
            try {
                setUploadingMedia(true);
                const media = await uploadImageCloudinary(file[0], initialValues?.media, 'stories');
                if (typeof media === 'string') {
                    setUploadingMedia(false);
                    onSubmit({ ...formData, media, mediaType: file[0].type });
                }
            } catch (err) {
                setUploadingMedia(false);
                notification.error({
                    maxCount: 1,
                    key: 'error',
                    message: 'Oops!',
                    placement: 'topRight',
                    description: (err as Error)?.message,
                });
            }
        } else onSubmit({ ...formData, media: initialValues?.media, mediaType: initialValues?.mediaType });
    };

    useEffect(() => {
        setMediaUploadErr('');
    }, []);

    useEffect(() => {
        if (isEdit) handleSearchUser(initialValues?.user?.userName);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, initialValues]);

    useEffect(() => {
        setFile([]);
        if (!isEdit) setMedia(null);
        else setMedia(initialValues?.media);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit]);

    useEffect(() => {
        if (!isEmpty(acceptedFiles)) {
            setFile(acceptedFiles);
            setMediaUploadErr?.('');
        }
    }, [acceptedFiles]);

    useEffect(() => {
        const isFileTooLarge = fileRejections[0]?.errors[0]?.code === 'file-too-large';
        const isFileInvalidType = fileRejections[0]?.errors[0]?.code === 'file-invalid-type';

        if (!isEmpty(fileRejections) && isFileTooLarge) setMediaUploadErr('Le fichier doit faire moins de 20 Mo');
        else if (!isEmpty(fileRejections) && isFileInvalidType) {
            setMediaUploadErr('Le fichier media doit être une image ou une video');
        }
    }, [fileRejections]);

    const handleSearchUser = (value: string | undefined): void => {
        if (value) dispatch(searchUsersAction({ search: value }));
    };

    const plansOptions = plans?.map((plan) => ({
        value: plan.id,
        label: format(plan.name, 'upper-lowercase'),
    }));
    const usersOptions = users?.map((user) => ({
        value: user.id,
        label: (
            <div className="d-flex justify-content-between w-100">
                <strong>{user.userName}</strong>
                <span className="text-muted">{user.email}</span>
            </div>
        ),
    }));

    const onRemoveFile = (): void => {
        acceptedFiles.length = 0;
        acceptedFiles.splice(0, acceptedFiles.length);
        setFile([]);
    };

    return (
        <Form
            size="large"
            form={formRef}
            layout="vertical"
            name="create_plan"
            onFinish={onSubmitStory}
            initialValues={isEdit ? { ...initialValues, startDate: dayjs(initialValues?.startDate) } : {}}
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
                name="planId"
                label="Formule d'abonnement"
                validateTrigger={['onSubmit', 'onBlur']}
                rules={planValidator("Formule d'abonnement")}
            >
                <Select
                    size="large"
                    filterOption={false}
                    options={plansOptions}
                    loading={loadingPlans}
                    disabled={loadingPlans}
                    defaultActiveFirstOption={false}
                    placeholder="Sélectionner la formule d'abonnement"
                />
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
                    placeholder="Ecrire quelque chose sur l'story"
                />
            </Item>

            <Item
                name="startDate"
                label="Date de lancement"
                validateTrigger={['onSubmit', 'onBlur']}
                rules={startDateValidator('Date de lancement')}
            >
                <AppDatePicker size="large" format="DD MMM YYYY" placeholder="Sélectionnez la date de lancement" />
            </Item>

            <Item
                name="redirectUrl"
                label="Lien de redirection"
                validateTrigger={['onSubmit', 'onBlur']}
                rules={redirectUrl('Lien de redirection')}
            >
                <Input size="large" placeholder="Lien de redirection" />
            </Item>

            <Item label="Media" required>
                <FileUploader
                    media={media}
                    context={formContext}
                    cloudFolderName="stories"
                    getRootProps={getRootProps}
                    onRemoveFile={onRemoveFile}
                    acceptedFiles={acceptedFiles}
                    getInputProps={getInputProps}
                />
                {mediaUploadErr && <small className="ant-form-item-explain-error">{mediaUploadErr}</small>}
            </Item>
        </Form>
    );
};

export default CreateStoryForm;
