import React, { FC, useState, useEffect } from 'react';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { Form, Modal } from 'antd';
import { IStoryData } from '@interfaces/promotion';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@redux/store';
import { IRootState } from '@redux/reducers';
import addStoryAction, { resetAddStoryAction } from '@redux/story/add';
import CreateModalHeader from '@components/common/CreateModalHeader';
import getAllStoryPlanAction from '@redux/story/plans';
import FormSuccessResult from '@components/common/FormSuccessResult';
import CreateStoryForm from '@components/form/CreateStoryForm';
import { IStory, IUser } from '@interfaces/api';

import styles from './index.module.scss';

const { useForm } = Form;

export interface IStoryModalProps {
    visible: boolean;
    reload?: () => void;
    initialValues?: IStory;
    formContext: EnumFormContext;
    setVisible: (val: boolean) => void;
}

const SUCCESS_CREATE = 'Le Story a été créée avec succès';
const SUCCESS_EDIT = 'Le Story a été modifiée avec succès';
const StoryModal: FC<IStoryModalProps> = ({
    visible,
    setVisible,
    formContext,
    initialValues,
    reload = () => {
        //
    },
}) => {
    const [form] = useForm();
    const dispatch = useAppDispatch();
    const [success, setSuccess] = useState<string>('');
    const [uploadingMedia, setUploadingMedia] = useState(false);

    const isEdit = formContext === EnumFormContext.EDIT;
    const { error, loading } = useSelector(({ story: { add } }: IRootState) => add);
    const { data: plans, loading: loadingPlans } = useSelector(({ story: { plans } }: IRootState) => plans);
    const { data: users, loading: loadingUsers } = useSelector(({ users: { search } }: IRootState) => search);

    const onCloseModal = (): void => {
        setVisible(false);
        form.resetFields();
    };

    const onSubmitStory = (formData: IUnknownObject | IStoryData): void => {
        form.validateFields();
        dispatch(
            addStoryAction({
                isEdit,
                data: isEdit ? ({ ...formData, id: initialValues?.id } as IStoryData) : (formData as IStoryData),
            }),
        ).then((res) => {
            if (['story/add/rejected'].includes(res.type)) window.scrollTo({ top: 0, behavior: 'smooth' });
            if (['story/add/fulfilled'].includes(res.type)) {
                reload();
                setSuccess(isEdit ? SUCCESS_EDIT : SUCCESS_CREATE);
                form.resetFields();
            }
        });
    };

    useEffect(() => {
        if (visible) setSuccess('');
        resetAddStoryAction()(dispatch);
        dispatch(getAllStoryPlanAction());
    }, [dispatch, visible]);

    return (
        <Modal
            centered
            width={520}
            footer={null}
            destroyOnClose
            closable={false}
            visible={visible}
            className={styles.storyModal}
            wrapClassName={styles.storyModal__wrap}
            title={
                !success && (
                    <CreateModalHeader
                        context="story"
                        isEdit={isEdit}
                        onCloseModal={onCloseModal}
                        onSubmit={() => form.submit()}
                        loading={loading || uploadingMedia}
                    />
                )
            }
        >
            {success ? (
                <FormSuccessResult title={success} onClose={onCloseModal} />
            ) : (
                <CreateStoryForm
                    error={error}
                    formRef={form}
                    plans={plans?.rows}
                    onSubmit={onSubmitStory}
                    users={users as IUser[]}
                    formContext={formContext}
                    loadingUsers={loadingUsers}
                    loadingPlans={loadingPlans}
                    initialValues={initialValues}
                    setUploadingMedia={setUploadingMedia}
                />
            )}
        </Modal>
    );
};

export default StoryModal;
