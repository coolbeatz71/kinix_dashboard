import React, { FC, Fragment, ReactNode, useState } from 'react';
import { lowerCase, truncate } from 'lodash';
import { useSelector } from 'react-redux';
import { IVideo } from '@interfaces/api';
import { EnumActionContext } from '@interfaces/app';
import { Button, Col, Form, Modal, Row, Input, notification, Tooltip } from 'antd';
import FloatTextInput from '@components/common/FloatTextInput';
import { required } from '@helpers/validators';
import ErrorAlert from '@components/common/ErrorAlert';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';

import approveVideoAction, { resetApproveVideoAction } from '@redux/videos/approve';
import deleteVideoAction, { resetDeleteVideoAction } from '@redux/videos/delete';
import disableVideoAction, { resetDisableVideoAction } from '@redux/videos/disable';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const { Item } = Form;
const { Password } = Input;

export interface IVideoActionModalProps {
    video: IVideo;
    reload: () => void;
    closeMenu?: () => void;
    context: EnumActionContext;
}

const VideoActionModal: FC<IVideoActionModalProps> = ({
    video,
    reload,
    closeMenu = () => {
        //
    },
    context,
}) => {
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);

    const {
        delete: { error: errDelete, loading: loadingDelete },
        approve: { error: errApprove, loading: loadingApprove },
        disable: { error: errDisable, loading: loadingDisable },
    } = useSelector(({ videos }: IRootState) => videos);

    const error = errApprove || errDisable || errDelete;
    const loading = loadingApprove || loadingDisable || loadingDelete;

    const getButtonIcon = (): ReactNode => {
        switch (context) {
            case EnumActionContext.APPROVE:
                return <CheckCircleOutlined />;
            case EnumActionContext.DISABLE:
                return <StopOutlined />;
            default:
                return <DeleteOutlined />;
        }
    };
    const getButtonText = (): string => {
        switch (context) {
            case EnumActionContext.APPROVE:
                return 'Approver';
            case EnumActionContext.DISABLE:
                return 'Désactiver';
            default:
                return 'Effacer';
        }
    };

    const getSuccessMessage = (): string => {
        switch (context) {
            case EnumActionContext.APPROVE:
                return 'apprové';
            case EnumActionContext.DISABLE:
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
            description: `Video: "${video.title}" ${getSuccessMessage()}`,
        });
        clearErrors();
        reload();
        setOpenModal(false);
    };

    const onFinish = (password: string): void => {
        const params = { slug: video.slug, password };
        const responseType = `videos/${lowerCase(context)}/fulfilled`;
        switch (context) {
            case EnumActionContext.APPROVE:
                dispatch(approveVideoAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
            case EnumActionContext.DISABLE:
                dispatch(disableVideoAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
            default:
                dispatch(deleteVideoAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
        }
    };

    const clearErrors = (): void => {
        resetApproveVideoAction()(dispatch);
        resetDisableVideoAction()(dispatch);
        resetDeleteVideoAction()(dispatch);
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
                danger={context === EnumActionContext.DELETE}
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
                    <Tooltip title={video.title} visible>
                        {getButtonText()} video: "{truncate(video.title, { length: 40 })}
                    </Tooltip>
                }
            >
                <Form
                    initialValues={{ password }}
                    validateTrigger={['onFinish']}
                    onFinish={() => onFinish(password)}
                    onValuesChange={({ password: ps }) => setPassword(ps)}
                >
                    <Item name="password" validateTrigger={['onSubmit', 'onBlur']} rules={[required('Mot de passe')]}>
                        <FloatTextInput label="Mot de passe" placeholder="Mot de passe" required>
                            <Password size="large" visibilityToggle autoComplete="new-password" />
                        </FloatTextInput>
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

export default VideoActionModal;
