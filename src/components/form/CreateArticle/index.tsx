import React, { FC, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Form, FormInstance, Input, Select } from 'antd';
import { deleteImageFromCloudinary } from '@services/cloudinary';
import { summaryValidator, tagsValidator, titleValidator } from './validators';
import { IArticleData } from '@interfaces/articles';
import useQuillEditor from '@hooks/useQuillEditor';
import getQuillImageUrls from '@helpers/getQuillImageUrls';
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

const CreateArticleForm: FC<ICreateArticleProps> = ({ onSubmit, formRef, error, formContext, initialValues }) => {
    const textAreaStyle = { height: 98 };
    const isEdit = formContext === EnumFormContext.EDIT;

    const { component: quillEditor, quill } = useQuillEditor();

    const [articleBody, setArticleBody] = useState<string | undefined>(isEdit ? initialValues?.body : '');
    const [insertedImages, setInsertedImages] = useState<string[]>([]);

    useEffect(() => {
        if (quill && isEdit) quill.clipboard.dangerouslyPasteHTML(String(articleBody));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quill, isEdit]);

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
                        const data = await deleteImageFromCloudinary(deleted[0], 'articles');
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
            slug: initialValues?.slug,
            title,
            summary,
            tags,
            body: articleBody,
            images: insertedImages,
        });
    };

    return (
        <Form
            size="large"
            form={formRef}
            layout="vertical"
            name="create_article"
            onFinish={onSubmitArticle}
            initialValues={isEdit ? initialValues : {}}
        >
            <ErrorAlert error={error} closable banner showIcon />

            <Item name="title" label="Titre" validateTrigger={['onSubmit', 'onBlur']} rules={titleValidator('Titre')}>
                <Input size="large" maxLength={100} placeholder="Titre" />
            </Item>

            <Item
                name="summary"
                label="Sommaire"
                rules={summaryValidator('Sommaire')}
                validateTrigger={['onSubmit', 'onBlur']}
            >
                <TextArea
                    showCount
                    size="large"
                    maxLength={300}
                    autoSize={false}
                    placeholder="Sommaire"
                    style={textAreaStyle}
                />
            </Item>

            {quillEditor}

            <Item name="tags" label="Mots clés" validateTrigger={['onSubmit', 'onBlur']} rules={tagsValidator('Tags')}>
                <Select mode="tags" size="large" placeholder="Ex: kinshasa, music, hip-hop" maxTagCount="responsive" />
            </Item>
        </Form>
    );
};

export default CreateArticleForm;
