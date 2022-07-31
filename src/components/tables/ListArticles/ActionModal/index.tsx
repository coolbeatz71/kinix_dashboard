import React, { FC, useState } from 'react';
import { Button, Col, Form, Modal, Row, Input } from 'antd';
import { EnumActionContext } from '@interfaces/app';
import { IArticle } from '@interfaces/api';
import FloatTextInput from '@components/common/FloatTextInput';
import { required } from '@helpers/validators';
import ErrorAlert from '@components/common/ErrorAlert';

const { Item } = Form;
const { Password } = Input;

export interface IArticleActionModalProps {
    article: IArticle;
    reload: () => void;
    closeMenu?: () => void;
    context: EnumActionContext;
}

const ArticleActionModal: FC<IArticleActionModalProps> = ({
    article,
    closeMenu = () => {
        //
    },
    context,
}) => {
    const [password, setPassword] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);

    const getButtonText = (): string => {
        switch (context) {
            case EnumActionContext.APPROVE:
                return 'Approver';
            case EnumActionContext.DISABLE:
                return 'Désactiver';
            case EnumActionContext.DELETE:
                return 'Effacer';
            default:
                return 'Effacer';
        }
    };

    const onFinish = (password: string) => {
        console.log(password);
    };

    const clearErrors = () => {};

    return (
        <>
            <Button
                type="text"
                danger={context === EnumActionContext.DELETE}
                onClick={() => {
                    closeMenu();
                    clearErrors();
                    setVisible(true);
                    setPassword('');
                }}
            >
                {getButtonText()}
            </Button>

            <Modal
                title={`${getButtonText()} article:  "${article.title}"`}
                footer={null}
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                <Form
                    initialValues={{ password }}
                    validateTrigger={['onFinish']}
                    onValuesChange={({ password: ps }) => {
                        setPassword(ps);
                    }}
                    onFinish={() => onFinish(password)}
                >
                    <Item name="password" validateTrigger={['onSubmit', 'onBlur']} rules={[required('Mot de passe')]}>
                        <FloatTextInput label="Mot de passe" placeholder="Mot de passe" required>
                            <Password size="large" visibilityToggle autoComplete="new-password" />
                        </FloatTextInput>
                    </Item>

                    <ErrorAlert error={error} showIcon closable banner />

                    <Item>
                        <Row gutter={20} justify="end">
                            <Col>
                                <Button type="primary" size="large" htmlType="submit" loading={loading} danger>
                                    Confirmer
                                </Button>
                            </Col>
                        </Row>
                    </Item>
                </Form>
            </Modal>
        </>
    );
};

export default ArticleActionModal;
