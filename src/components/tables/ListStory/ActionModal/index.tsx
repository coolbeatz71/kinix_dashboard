import React, { FC, Fragment, ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { lowerCase, truncate } from 'lodash';
import { Button, Col, Form, Modal, Row, Input, notification, Tooltip } from 'antd';
import { EnumPromotionActionContext } from '@interfaces/app';
import { IStory } from '@interfaces/api';
import { required } from '@helpers/validators';
import ErrorAlert from '@components/common/ErrorAlert';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import enableStoryAction, { resetEnableStoryAction } from '@redux/story/enable';
import deleteStoryAction, { resetDeleteStoryAction } from '@redux/story/delete';
import disableStoryAction, { resetDisableStoryAction } from '@redux/story/disable';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const { Item } = Form;
const { Password } = Input;

export interface IStoryActionModalProps {
    story: IStory;
    reload: () => void;
    closeMenu?: () => void;
    context: EnumPromotionActionContext;
}

const StoryActionModal: FC<IStoryActionModalProps> = ({
    story,
    reload,
    context,
    closeMenu = () => {
        //
    },
}) => {
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);

    const {
        delete: { error: errDelete, loading: loadingDelete },
        enable: { error: errEnable, loading: loadingEnable },
        disable: { error: errDisable, loading: loadingDisable },
    } = useSelector(({ story }: IRootState) => story);

    const error = errEnable || errDisable || errDelete;
    const loading = loadingEnable || loadingDisable || loadingDelete;

    const getButtonIcon = (): ReactNode => {
        switch (context) {
            case EnumPromotionActionContext.ENABLE:
                return <CheckCircleOutlined />;
            case EnumPromotionActionContext.DISABLE:
                return <StopOutlined />;
            default:
                return <DeleteOutlined />;
        }
    };
    const getButtonText = (): string => {
        switch (context) {
            case EnumPromotionActionContext.ENABLE:
                return 'Activer';
            case EnumPromotionActionContext.DISABLE:
                return 'Désactiver';
            default:
                return 'Effacer';
        }
    };

    const getSuccessMessage = (): string => {
        switch (context) {
            case EnumPromotionActionContext.ENABLE:
                return 'activé';
            case EnumPromotionActionContext.DISABLE:
                return 'désactivé';
            default:
                return 'effacé';
        }
    };

    const handleSuccess = (): void => {
        notification.success({
            maxCount: 1,
            key: 'success',
            placement: 'topRight',
            message: 'Confirmation',
            description: `Story: "${story.title}" ${getSuccessMessage()}`,
        });
        clearErrors();
        reload();
        setOpenModal(false);
    };

    const onFinish = (password: string): void => {
        const params = { id: Number(story.id), password };
        const responseType = `story/${lowerCase(context)}/fulfilled`;
        switch (context) {
            case EnumPromotionActionContext.ENABLE:
                dispatch(enableStoryAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
            case EnumPromotionActionContext.DISABLE:
                dispatch(disableStoryAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
            default:
                dispatch(deleteStoryAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
        }
    };

    const clearErrors = (): void => {
        resetEnableStoryAction()(dispatch);
        resetDeleteStoryAction()(dispatch);
        resetDisableStoryAction()(dispatch);
    };

    return (
        <Fragment>
            <Button
                type="text"
                onClick={() => {
                    closeMenu();
                    clearErrors();
                    setPassword('');
                    setOpenModal(true);
                }}
                icon={getButtonIcon()}
                className={styles.actionModal__button}
                danger={context === EnumPromotionActionContext.DELETE}
            >
                {getButtonText()}
            </Button>

            <Modal
                footer={null}
                destroyOnClose
                visible={openModal}
                closeIcon={<CloseCircleOutlined />}
                onCancel={() => setOpenModal(false)}
                className={styles.actionModal__modal}
                title={
                    <Tooltip title={story.title} visible>
                        {getButtonText()} story: "{truncate(story.title, { length: 40 })}
                    </Tooltip>
                }
            >
                <Form
                    layout="vertical"
                    initialValues={{ password }}
                    validateTrigger={['onFinish']}
                    onFinish={() => onFinish(password)}
                    onValuesChange={({ password: ps }) => setPassword(ps)}
                >
                    <Item
                        name="password"
                        label="Mot de passe"
                        rules={[required('Mot de passe')]}
                        validateTrigger={['onSubmit', 'onBlur']}
                    >
                        <Password
                            size="large"
                            visibilityToggle
                            autoComplete="new-password"
                            placeholder="••••••••••••••"
                        />
                    </Item>

                    <ErrorAlert error={error} showIcon closable banner />

                    <Row gutter={24} justify="end">
                        <Col>
                            <Button type="primary" ghost size="large" htmlType="submit" loading={loading}>
                                Confirmer
                            </Button>
                        </Col>
                        <Col>
                            <Button danger size="large" type="primary" onClick={() => setOpenModal(false)}>
                                Annuler
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Fragment>
    );
};

export default StoryActionModal;
