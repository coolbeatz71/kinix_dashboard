import React, { FC, Fragment, ReactNode, useState } from 'react';
import { lowerCase, truncate } from 'lodash';
import { useSelector } from 'react-redux';
import { IUser } from '@interfaces/api';
import { EnumUserActionContext } from '@interfaces/app';
import { Button, Col, Form, Modal, Row, Input, notification, Tooltip } from 'antd';
import FloatTextInput from '@components/common/FloatTextInput';
import { required } from '@helpers/validators';
import ErrorAlert from '@components/common/ErrorAlert';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';

import unblockUserAction, { resetUnblockUserAction } from '@redux/users/unblock';
import deleteUserAction, { resetDeleteUserAction } from '@redux/users/delete';
import blockUserAction, { resetBlockUserAction } from '@redux/users/block';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const { Item } = Form;
const { Password } = Input;

export interface IUserActionModalProps {
    user: IUser;
    reload: () => void;
    closeMenu?: () => void;
    context: EnumUserActionContext;
}

const UserActionModal: FC<IUserActionModalProps> = ({
    user,
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
        block: { error: errBlock, loading: loadingBlock },
        delete: { error: errDelete, loading: loadingDelete },
        unblock: { error: errUnblock, loading: loadingUnblock },
    } = useSelector(({ users }: IRootState) => users);

    const error = errUnblock || errBlock || errDelete;
    const loading = loadingUnblock || loadingBlock || loadingDelete;

    const getButtonIcon = (): ReactNode => {
        switch (context) {
            case EnumUserActionContext.BLOCK:
                return <StopOutlined />;
            case EnumUserActionContext.UNBLOCK:
                return <CheckCircleOutlined />;
            default:
                return <DeleteOutlined />;
        }
    };
    const getButtonText = (): string => {
        switch (context) {
            case EnumUserActionContext.BLOCK:
                return 'Bloquer';
            case EnumUserActionContext.UNBLOCK:
                return 'Débloquer';
            default:
                return 'Effacer';
        }
    };

    const getSuccessMessage = (): string => {
        switch (context) {
            case EnumUserActionContext.BLOCK:
                return 'bloqué';
            case EnumUserActionContext.UNBLOCK:
                return 'débloqué';
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
            description: `Utilisateur: "${user.userName} - ${user.email}" ${getSuccessMessage()}`,
        });
        clearErrors();
        reload();
        setOpenModal(false);
    };

    const onFinish = (password: string): void => {
        const params = { id: Number(user.id), password };
        const responseType = `users/${lowerCase(context)}/fulfilled`;
        switch (context) {
            case EnumUserActionContext.UNBLOCK:
                dispatch(unblockUserAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
            case EnumUserActionContext.BLOCK:
                dispatch(blockUserAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
            default:
                dispatch(deleteUserAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
        }
    };

    const clearErrors = (): void => {
        resetUnblockUserAction()(dispatch);
        resetBlockUserAction()(dispatch);
        resetDeleteUserAction()(dispatch);
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
                danger={context === EnumUserActionContext.DELETE}
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
                    <Tooltip title={user.email} visible>
                        {getButtonText()} utilisateur: "{truncate(user.userName, { length: 40 })}
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

export default UserActionModal;
