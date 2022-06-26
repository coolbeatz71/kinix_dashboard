import React, { FC } from 'react';
import { Form, Input } from 'antd';
import { IUnknownObject } from '@interfaces/app';
import FloatTextInput from '@components/common/FloatTextInput';
import QuillEditor from '@components/common/QuillEditor';

const { Item, useForm } = Form;
const { TextArea } = Input;

const CreateArticleForm: FC = () => {
    const [form] = useForm();

    const onSubmit = (val: IUnknownObject): void => {
        console.log(val);
    };

    return (
        <Form form={form} size="large" layout="vertical" onFinish={onSubmit} name="create_article">
            <Item name="title" validateTrigger={['onSubmit', 'onBlur']} rules={[]}>
                <FloatTextInput label="Titre" placeholder="Titre" required>
                    <Input size="large" maxLength={200} />
                </FloatTextInput>
            </Item>

            <Item name="summary" validateTrigger={['onSubmit', 'onBlur']} rules={[]}>
                <FloatTextInput label="Sommaire" placeholder="Sommaire" required>
                    <TextArea size="large" maxLength={300} showCount />
                </FloatTextInput>
            </Item>

            <QuillEditor />
        </Form>
    );
};

export default CreateArticleForm;
