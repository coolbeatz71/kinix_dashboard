import React, { FC } from 'react';
import { Button, Typography } from 'antd';
import Lottie, { Options } from 'react-lottie';
import notFound from '@assets/404_anim.json';
import { IUnknownObject } from '@interfaces/app';
import { DASHBOARD_PATH } from '@constants/paths';
import { HomeOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Page404: FC<IUnknownObject> = () => {
    const defaultOptions: Options = {
        loop: true,
        autoplay: true,
        animationData: notFound,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className="notFound">
            <Lottie width={512} height={512} options={defaultOptions} />
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
