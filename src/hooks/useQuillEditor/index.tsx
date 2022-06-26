import React, { ReactElement, RefObject, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import Quill from 'quill';
import axios from 'axios';
import { IMAGES_API_PRESET, IMAGES_API_SECRET, IMAGES_API_URL } from '@constants/platform';
import { IUnknownObject } from '@interfaces/app';

import styles from './index.module.scss';

export interface IQuillEditorData {
    quill: Quill | undefined;
    quillRef: RefObject<IUnknownObject>;
    component: ReactElement;
}

const useQuillEditor = (): IQuillEditorData => {
    const placeholder = 'Ecrire quelque chose ici...';

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['link', 'image', 'video'],
            [{ color: [] }],
        ],
    };

    const { quill, quillRef } = useQuill({ placeholder, modules });

    const insertToEditor = (url: string): void => {
        const range = quill?.getSelection();
        quill?.insertEmbed(range?.index as number, 'image', url);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saveToServer = async (file: File): Promise<any> => {
        const formData = new FormData();

        formData.append('file', file, file.name);
        formData.append('upload_preset', IMAGES_API_PRESET);
        formData.append('api_key', IMAGES_API_SECRET);

        const { data } = await axios.post(`${IMAGES_API_URL}/upload`, formData, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });
        insertToEditor(data.url);
    };

    const selectLocalImage = (): void => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = (input as IUnknownObject)?.files[0];
            saveToServer(file);
        };
    };

    useEffect(() => {
        if (quill) quill.getModule('toolbar').addHandler('image', selectLocalImage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quill]);

    const component = (
        <div className={styles.quillEditor}>
            <div ref={quillRef} />
        </div>
    );

    return {
        quill,
        quillRef,
        component,
    };
};

export default useQuillEditor;
