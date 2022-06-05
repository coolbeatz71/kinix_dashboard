import React, { FC } from 'react';
import { Alert, Form } from 'antd';
import { IUnknownObject } from '@interfaces/app';

const { Item } = Form;

export interface IErrorAlertProps {
    error: Error | IUnknownObject | null;
    closable: boolean;
    banner: boolean;
    showIcon: boolean;
}

const ErrorAlert: FC<IErrorAlertProps> = ({ error, closable, banner, showIcon }) => {
    return (
        error && (
            <Item>
                <Alert message={error?.message} type="error" showIcon={showIcon} closable={closable} banner={banner} />
            </Item>
        )
    );
};

export default ErrorAlert;
