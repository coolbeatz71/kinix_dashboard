import React, { FC, Fragment, ReactNode, useState } from 'react';
import { lowerCase, truncate } from 'lodash';
import { useSelector } from 'react-redux';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    StopOutlined,
} from '@ant-design/icons';
import { IArticle } from '@interfaces/api';
import { EnumArticleVideoActionContext } from '@interfaces/app';
import { Button, Col, Form, Modal, Row, Input, notification, Tooltip } from 'antd';
import { required } from '@helpers/validators';
import ErrorAlert from '@components/common/ErrorAlert';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import approveArticleAction, { resetApproveArticleAction } from '@redux/articles/approve';
import deleteArticleAction, { resetDeleteArticleAction } from '@redux/articles/delete';
import disableArticleAction, { resetDisableArticleAction } from '@redux/articles/disable';
import featureArticleAction, { resetFeatureArticleAction } from '@redux/articles/feature';
import unfeatureArticleAction, { resetUnFeatureArticleAction } from '@redux/articles/unfeature';

import styles from './index.module.scss';

const { Item } = Form;
const { Password } = Input;

export interface IArticleActionModalProps {
    article: IArticle;
    reload: () => void;
    closeMenu?: () => void;
    context: EnumArticleVideoActionContext;
}

const ArticleActionModal: FC<IArticleActionModalProps> = ({
    article,
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
        feature: { error: errFeature, loading: loadingFeature },
        unfeature: { error: errUnFeature, loading: loadingUnFeature },
    } = useSelector(({ articles }: IRootState) => articles);

    const error = errApprove || errDisable || errDelete || errFeature || errUnFeature;
    const loading = loadingApprove || loadingDisable || loadingDelete || loadingFeature || loadingUnFeature;

    const getButtonIcon = (): ReactNode => {
        switch (context) {
            case EnumArticleVideoActionContext.APPROVE:
                return <CheckCircleOutlined />;
            case EnumArticleVideoActionContext.DISABLE:
                return <StopOutlined />;
            case EnumArticleVideoActionContext.FEATURE:
                return <EyeOutlined />;
            case EnumArticleVideoActionContext.UNFEATURE:
                return <EyeInvisibleOutlined />;
            default:
                return <DeleteOutlined />;
        }
    };
    const getButtonText = (): string => {
        switch (context) {
            case EnumArticleVideoActionContext.APPROVE:
                return 'Approver';
            case EnumArticleVideoActionContext.DISABLE:
                return 'Désactiver';
            case EnumArticleVideoActionContext.FEATURE:
                return 'A la une: ON';
            case EnumArticleVideoActionContext.UNFEATURE:
                return 'A la une: OFF';
            default:
                return 'Effacer';
        }
    };

    const getSuccessMessage = (): string => {
        switch (context) {
            case EnumArticleVideoActionContext.APPROVE:
                return 'apprové';
            case EnumArticleVideoActionContext.DISABLE:
                return 'désactivé';
            case EnumArticleVideoActionContext.FEATURE:
                return 'mis à la une';
            case EnumArticleVideoActionContext.UNFEATURE:
                return 'retiré de la une';
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
            description: `Article: "${article.title}" ${getSuccessMessage()}`,
        });
        clearErrors();
        reload();
        setOpenModal(false);
    };

    const onFinish = (password: string): void => {
        const params = { slug: article.slug, password };
        const responseType = `articles/${lowerCase(context)}/fulfilled`;
        switch (context) {
            case EnumArticleVideoActionContext.APPROVE:
                dispatch(approveArticleAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
            case EnumArticleVideoActionContext.DISABLE:
                dispatch(disableArticleAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
            case EnumArticleVideoActionContext.FEATURE:
                dispatch(featureArticleAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
            case EnumArticleVideoActionContext.UNFEATURE:
                dispatch(unfeatureArticleAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
            default:
                dispatch(deleteArticleAction(params)).then((res) => {
                    if (res.type === responseType) handleSuccess();
                });
                break;
        }
    };

    const clearErrors = (): void => {
        resetApproveArticleAction()(dispatch);
        resetDisableArticleAction()(dispatch);
        resetDeleteArticleAction()(dispatch);
        resetFeatureArticleAction()(dispatch);
        resetUnFeatureArticleAction()(dispatch);
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
                danger={context === EnumArticleVideoActionContext.DELETE}
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
                    <Tooltip title={article.title} visible>
                        {getButtonText()} video: "{truncate(article.title, { length: 40 })}
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

export default ArticleActionModal;
