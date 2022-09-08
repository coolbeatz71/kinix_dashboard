import React, { FC, MouseEventHandler } from 'react';
import { Alert, Form } from 'antd';
import { IUnknownObject } from '@interfaces/app';

const { Item } = Form;

export interface IErrorAlertProps {
    error: Error | IUnknownObject | null;
    closable: boolean;
    banner: boolean;
    showIcon: boolean;
    closeText?: string;
    onClose?: MouseEventHandler<HTMLButtonElement>;
}

const ErrorAlert: FC<IErrorAlertProps> = ({ error, closable, banner, showIcon, onClose, closeText = '' }) => {
    return (
        error && (
            <Item>
                <Alert
                    type="error"
                    banner={banner}
                    onClose={onClose}
                    showIcon={showIcon}
                    closable={closable}
                    closeText={closeText}
                    message={error?.message}
                />
            </Item>
        )
    );
};

export default ErrorAlert;
