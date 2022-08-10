import React, { FC } from 'react';
import { Button, Typography } from 'antd';
import Lottie from 'react-lottie';
import notFound from '@assets/404_anim.json';
import { IUnknownObject } from '@interfaces/app';
import { DASHBOARD_PATH } from '@constants/paths';
import { HomeOutlined } from '@ant-design/icons';
import getLottieOptions from '@helpers/getLottieOptions';

const { Title } = Typography;

const Page404: FC<IUnknownObject> = () => {
    const lottieOps = getLottieOptions(notFound);

    return (
        <div className="notFound">
            <Lottie width={512} height={512} options={lottieOps} />
            <Title className="text-center" data-text="title">
                Oops! Page non trouvée
            </Title>
            <a href={DASHBOARD_PATH} rel="noopener">
                <Button className="text-center" size="large" type="primary" icon={<HomeOutlined />}>
                    Retour à l'Accueil
                </Button>
            </a>
        </div>
    );
};

export default Page404;
