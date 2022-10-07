import React, { FC, Fragment, ReactNode, useState } from 'react';
import { lowerCase, truncate } from 'lodash';
import { useSelector } from 'react-redux';
import { EnumPromotionActionContext } from '@interfaces/app';
import { Button, Col, Form, Modal, Row, Input, notification, Tooltip } from 'antd';
import { IAds } from '@interfaces/api';
import { required } from '@helpers/validators';
import ErrorAlert from '@components/common/ErrorAlert';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import enableAdsAction, { resetEnableAdsAction } from '@redux/ads/enable';
import deleteAdsAction, { resetDeleteAdsAction } from '@redux/ads/delete';
import disableAdsAction, { resetDisableAdsAction } from '@redux/ads/disable';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const { Item } = Form;
const { Password } = Input;

export interface IAdsActionModalProps {
    ads: IAds;
    reload: () => void;
    closeMenu?: () => void;
    context: EnumPromotionActionContext;
}

const AdsActionModal: FC<IAdsActionModalProps> = ({
    ads,
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
    } = useSelector(({ ads }: IRootState) => ads);

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
            description: `Ads: "${ads.title}" ${getSuccessMessage()}`,
        });
        clearErrors();
        reload();
        setOpenModal(false);
    };

    const onFinish = (password: string): void => {
        const params = { id: Number(ads.id), password };
        const responseType = `ads/${lowerCase(context)}/fulfilled`;
        switch (context) {
            case EnumPromotionActionContext.ENABLE:
                dispatch(enableAdsAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
            case EnumPromotionActionContext.DISABLE:
                dispatch(disableAdsAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
            default:
                dispatch(deleteAdsAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
        }
    };

    const clearErrors = (): void => {
        resetEnableAdsAction()(dispatch);
        resetDeleteAdsAction()(dispatch);
        resetDisableAdsAction()(dispatch);
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
                    <Tooltip title={ads.title} visible>
                        {getButtonText()} ads: "{truncate(ads.title, { length: 40 })}
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

export default AdsActionModal;
