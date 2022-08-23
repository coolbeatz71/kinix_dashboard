import React, { FC } from 'react';
import { Button, Form, Input, notification } from 'antd';
import FloatTextInput from '@components/common/FloatTextInput';
import { commentValidator } from './validators';
import addYoutubeVideoCommentAction from '@redux/videos/addYoutubeVideoComment';
import { useAppDispatch } from '@redux/store';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import ErrorAlert from '@components/common/ErrorAlert';

const { TextArea } = Input;
const { Item, useForm } = Form;

export interface ICreateYoutubeCommentProps {
    videoLink: string;
    reload: () => void;
}

const CreateYoutubeComment: FC<ICreateYoutubeCommentProps> = ({ reload, videoLink }) => {
    const [form] = useForm();
    const dispatch = useAppDispatch();
    const textAreaStyle = { height: 80 };

    const { error, loading } = useSelector(
        ({ videos: { addYoutubeVideoComment } }: IRootState) => addYoutubeVideoComment,
    );

    const onSubmitComment = (formData: { comment: string }): void => {
        const { comment } = formData;

        dispatch(addYoutubeVideoCommentAction({ link: videoLink, comment })).then((res) => {
            if (res.type === 'videos/addYoutubeVideoComment/rejected') form.resetFields();
            if (res.type === 'videos/addYoutubeVideoComment/fulfilled') {
                reload();
                notification.success({
                    maxCount: 1,
                    key: 'success',
                    message: 'Youpi!',
                    placement: 'topRight',
                    description: 'Commentaire ajouté avec succès',
                });
            }
        });
    };

    return (
        <Form form={form} size="large" layout="vertical" name="create_comment" onFinish={onSubmitComment}>
            <Item name="comment" validateTrigger={['onSubmit', 'onBlur']} rules={commentValidator('Commentaire')}>
                <FloatTextInput label="Commentaire" placeholder="Ajouter un commentaire..." required>
                    <TextArea size="large" autoSize={false} style={textAreaStyle} />
                </FloatTextInput>
            </Item>

            <ErrorAlert error={error} closable banner showIcon />

            <div className="d-flex justify-content-end">
                <Button htmlType="submit" type="primary" size="middle" loading={loading} disabled={loading}>
                    Commenter
                </Button>
            </div>
        </Form>
    );
};

export default CreateYoutubeComment;
