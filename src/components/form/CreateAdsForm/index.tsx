import React, { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { Crop } from 'react-image-crop';
import { Form, FormInstance, Input, notification, Select } from 'antd';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { IAdsData } from '@interfaces/promotion';
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
import ImageCropper from '@components/common/ImageCropper';
import uploadImageCloudinary from '@services/cloudinary';
import { useAppDispatch } from '@redux/store';
import searchUsersAction from '@redux/users/search';
import { IAds, IAdsPlan, IUser } from '@interfaces/api';
import format from '@helpers/formatString';
import AppDatePicker from '@components/common/AppDatePicker';

const { Item } = Form;
const { TextArea } = Input;

export interface ICreateAdsFormProps {
    users?: IUser[];
    plans?: IAdsPlan[];
    initialValues?: IAds;
    loadingPlans: boolean;
    loadingUsers: boolean;
    formContext: EnumFormContext;
    formRef: FormInstance<IAdsData>;
    onSubmit: (val: IAdsData) => void;
    error: Error | IUnknownObject | null;
    setUploadingImage: (val: boolean) => void;
}

const CreateAdsForm: FC<ICreateAdsFormProps> = ({
    error,
    plans,
    users,
    formRef,
    onSubmit,
    formContext,
    loadingUsers,
    loadingPlans,
    initialValues,
    setUploadingImage,
}) => {
    const dispatch = useAppDispatch();
    const textAreaStyle = { height: 120 };
    const isEdit = formContext === EnumFormContext.EDIT;
    const [imgUploadError, setImgUploadError] = useState<string>('');
    const [uploadData, setUploadData] = useState<IUnknownObject>({
        file: [],
        uploadFile: null,
        image: initialValues?.image,
    });

    const onSubmitAds = async (formData: IAdsData): Promise<void> => {
        const isNoImage = isEmpty(uploadData.file) && isEmpty(uploadData.image) && isEmpty(!uploadData.uploadFile);
        if (isNoImage) setImgUploadError('Photo ads est obligatoire');
        else if (!isEmpty(uploadData.file)) {
            // upload a new file
            try {
                setUploadingImage(true);
                const image = await uploadImageCloudinary(uploadData.uploadFile, initialValues?.image, 'ads');
                if (typeof image === 'string') {
                    setUploadingImage(false);
                    onSubmit({ ...formData, image });
                }
            } catch (err) {
                setUploadingImage(false);
                notification.error({
                    maxCount: 1,
                    key: 'error',
                    message: 'Oops!',
                    placement: 'topRight',
                    description: (err as Error)?.message,
                });
            }
        } else onSubmit({ ...formData, image: uploadData.image });
    };

    const onImageCancel = (): void => setUploadData({ file: [], image: null });
    const onImageAccept = (image: Crop | null, file: File[], uploadFile: File): void => {
        setUploadData({ image, file, uploadFile });
    };

    useEffect(() => {
        setImgUploadError('');
    }, []);

    useEffect(() => {
        if (isEdit) handleSearchUser(initialValues?.user?.userName);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, initialValues]);

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

    return (
        <Form
            size="large"
            form={formRef}
            layout="vertical"
            name="create_plan"
            onFinish={onSubmitAds}
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
                    placeholder="Ecrire quelque chose sur l'ads"
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
