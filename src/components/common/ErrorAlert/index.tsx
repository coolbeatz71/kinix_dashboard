import React, { FC, MouseEventHandler } from 'react';
import { Alert, Form } from 'antd';
import { IUnknownObject } from '@interfaces/app';

const { Item } = Form;

export interface IErrorAlertProps {
    banner: boolean;
    showIcon: boolean;
    closable: boolean;
    closeText?: string;
    error: Error | IUnknownObject | null;
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
