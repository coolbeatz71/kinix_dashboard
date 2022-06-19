import React, { FC, MouseEventHandler } from 'react';
import { Alert, Form } from 'antd';
import { IUnknownObject } from '@interfaces/app';

const { Item } = Form;

export interface IErrorAlertProps {
    error: Error | IUnknownObject | null;
    closable: boolean;
    banner: boolean;
    showIcon: boolean;
    onClose?: MouseEventHandler<HTMLButtonElement>;
}

const ErrorAlert: FC<IErrorAlertProps> = ({ error, closable, banner, showIcon, onClose }) => {
    return (
        error && (
            <Item>
                <Alert
                    type="error"
                    banner={banner}
                    showIcon={showIcon}
                    closable={closable}
                    onClose={onClose}
                    message={error?.message}
                />
            </Item>
        )
    );
};

export default ErrorAlert;
