import React, { FC, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Form, FormInstance, Input, Select } from 'antd';
import FloatTextInput from '@components/common/FloatTextInput';
import { summaryValidator, tagsValidator, titleValidator } from './vaidators';
import { IArticleData } from '@interfaces/articles';
import useQuillEditor from '@hooks/useQuillEditor';
import getQuillImageUrls from '@helpers/getQuillImageUrls';
import deleteImageFromCloudinary from '@helpers/deleteImageCloudinary';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';
import ErrorAlert from '@components/common/ErrorAlert';

const { Item } = Form;
const { TextArea } = Input;

export interface ICreateArticleProps {
    initialValues?: IArticleData;
    formContext: EnumFormContext;
    formRef: FormInstance<IArticleData>;
    error: Error | IUnknownObject | null;
    onSubmit: (val: IArticleData) => void;
}

const CreateArticleForm: FC<ICreateArticleProps> = ({ onSubmit, formRef, error }) => {
    const textAreaStyle = { height: 98 };

    const { component: quillEditor, quill } = useQuillEditor();

    const [articleBody, setArticleBody] = useState('');
    const [insertedImages, setInsertedImages] = useState<string[]>([]);

    useEffect(() => {
        if (quill) {
            quill.on('editor-change', () => {
                const inserted = getQuillImageUrls(quill?.getContents().ops);
                if (!isEmpty(inserted)) setInsertedImages(inserted);
            });

            quill.on('text-change', async (_, oldDelta, source) => {
                if (source === 'user') {
                    const inserted = getQuillImageUrls(quill?.getContents().ops);
                    const deleted = getQuillImageUrls(quill?.getContents().diff(oldDelta).ops);

                    if (!isEmpty(deleted)) {
                        const data = await deleteImageFromCloudinary(deleted[0]);
                        if (data) setInsertedImages(inserted.filter((val) => val !== deleted[0]));
                    }
                    if (!isEmpty(inserted)) setInsertedImages(inserted);
                }

                setArticleBody(quill?.root.innerHTML);
            });
        }
    }, [quill]);

    const onSubmitArticle = (formData: IArticleData): void => {
        const { title, summary, tags } = formData;
        return onSubmit({
            title,
            summary,
            tags,
            body: articleBody,
            images: insertedImages,
        });
    };

    return (
        <Form form={formRef} size="large" layout="vertical" onFinish={onSubmitArticle} name="create_article">
            <ErrorAlert error={error} closable banner showIcon />

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

            {quillEditor}

            <Item name="tags" validateTrigger={['onSubmit', 'onBlur']} rules={tagsValidator('Tags')}>
                <Select mode="tags" size="large" placeholder="Ex: kinshasa, music, hip-hop" maxTagCount="responsive" />
            </Item>
        </Form>
    );
};

export default CreateArticleForm;
