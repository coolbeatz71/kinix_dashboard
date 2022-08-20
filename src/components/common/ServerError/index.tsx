import React, { FC } from 'react';
import { Result, Button } from 'antd';
import Lottie from 'react-lottie';
import error from '@assets/error_anim.json';
import getLottieOptions from '@helpers/getLottieOptions';

import styles from './index.module.scss';

export interface IServerErrorProps {
    onRefresh: () => void;
}

const ServerError: FC<IServerErrorProps> = ({ onRefresh }) => {
    const lottieOps = getLottieOptions(error);

    return (
        <Result
            className={styles.serverError}
            title="Désolé, quelque chose s'est mal passé"
            icon={<Lottie width={350} height={350} options={lottieOps} />}
            subTitle="Le serveur a rencontré une erreur et n'a pas pu terminer la requête."
            extra={
                <div className="d-flex justify-content-center">
                    <Button key="refresh" type="primary" ghost size="large" onClick={onRefresh}>
                        Actualiser la page
                    </Button>
                </div>
            }
        />
    );
};

export default ServerError;
