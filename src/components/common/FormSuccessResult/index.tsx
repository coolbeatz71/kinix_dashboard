import React, { FC } from 'react';
import { Button, Result } from 'antd';

const FormSuccessResult: FC<{ title: string; onClose: () => void }> = ({ title, onClose }) => {
    return (
        <Result
            title={title}
            status="success"
            extra={
                <div className="d-flex justify-content-center">
                    <Button size="large" type="primary" ghost onClick={onClose}>
                        Fermer
                    </Button>
                </div>
            }
        />
    );
};

export default FormSuccessResult;
