import React, { FC } from 'react';
import { Button, Form, FormInstance, Input } from 'antd';
import { commentValidator } from './validators';
import ErrorAlert from '@components/common/ErrorAlert';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import { IComment } from '@interfaces/api';
import { ICommentData } from '@interfaces/comments';

const { Item } = Form;
const { TextArea } = Input;

export interface ICreateArticleCommentProps {
    loading: boolean;
    initialValues?: IComment;
    formRef: FormInstance<ICommentData>;
    formContext: EnumFormContext;
    onSubmit: (val: ICommentData) => void;
    error: Error | IUnknownObject | null;
}

const CreateArticleComment: FC<ICreateArticleCommentProps> = ({ loading, error, formRef, initialValues, onSubmit }) => {
    const textAreaStyle = { height: 80 };

    return (
        <Form
            size="large"
            form={formRef}
            layout="vertical"
            onFinish={onSubmit}
            name="create_comment"
            initialValues={initialValues}
        >
            <Item
                name="body"
                label="Commentaire"
                rules={commentValidator('Commentaire')}
                validateTrigger={['onSubmit', 'onBlur']}
            >
                <TextArea
                    size="large"
                    autoSize={false}
                    style={textAreaStyle}
                    placeholder="Ajouter votre commentaire..."
                />
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

export default CreateArticleComment;
