import React, { FC } from 'react';
import { Form, Input } from 'antd';

import styles from './index.module.scss';
import { IUnknownObject } from '@interfaces/app';
import FloatTextInput from '@components/common/FloatTextInput';

const { Item, useForm } = Form;

const CreateArticleForm: FC = () => {
    const [form] = useForm();

    const onSubmit = (val: IUnknownObject): void => {
        console.log(val);
    };

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            name="admin_login"
            onFinish={onSubmit}
            className={styles.loginForm}
        >
            <Item name="title" validateTrigger={['onSubmit', 'onBlur']} rules={[]}>
                <FloatTextInput label="Titre" placeholder="Titre" required>
                    <Input size="large" />
                </FloatTextInput>
            </Item>
        </Form>
    );
};

export default CreateArticleForm;
