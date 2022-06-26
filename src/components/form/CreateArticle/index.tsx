import React, { FC } from 'react';
import { Form, FormInstance, Input, Select } from 'antd';
import FloatTextInput from '@components/common/FloatTextInput';
import QuillEditor from '@components/common/QuillEditor';
import { summaryValidator, tagsValidator, titleValidator } from './vaidators';
import { IArticleData } from '@interfaces/articles';

const { Item } = Form;
const { TextArea } = Input;

export interface ICreateArticleProps {
    formRef: FormInstance<IArticleData>;
    onSubmit: (val: IArticleData) => void;
}

const CreateArticleForm: FC<ICreateArticleProps> = ({ onSubmit, formRef }) => {
    const textAreaStyle = { height: 98 };

    return (
        <Form form={formRef} size="large" layout="vertical" onFinish={onSubmit} name="create_article">
            <Item name="title" validateTrigger={['onSubmit', 'onBlur']} rules={titleValidator('Titre')}>
                <FloatTextInput label="Titre" placeholder="Titre" required>
                    <Input size="large" maxLength={100} />
                </FloatTextInput>
            </Item>

            <Item name="summary" validateTrigger={['onSubmit', 'onBlur']} rules={summaryValidator('Sommaire')}>
                <FloatTextInput label="Sommaire" placeholder="Sommaire" required>
                    <TextArea size="large" maxLength={300} showCount autoSize={false} style={textAreaStyle} />
                </FloatTextInput>
            </Item>

            <QuillEditor />

            <Item name="tags" validateTrigger={['onSubmit', 'onBlur']} rules={tagsValidator('Tags')}>
                <Select mode="tags" size="large" placeholder="Ex: kinshasa, music, hip-hop" maxTagCount="responsive" />
            </Item>
        </Form>
    );
};

export default CreateArticleForm;
