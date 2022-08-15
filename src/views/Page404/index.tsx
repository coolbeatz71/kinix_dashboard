import React, { FC } from 'react';
import { Button, Typography } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Lottie from 'react-lottie';
import notFound from '@assets/404_anim.json';
import { IUnknownObject } from '@interfaces/app';
import { DASHBOARD_PATH } from '@constants/paths';
import { HomeOutlined } from '@ant-design/icons';
import getLottieOptions from '@helpers/getLottieOptions';
import { APP_NAME } from '@constants/platform';

const { Title } = Typography;

const Page404: FC<IUnknownObject> = () => {
    const lottieOps = getLottieOptions(notFound);

    return (
        <HelmetProvider>
            <div className="notFound">
                <Helmet>
                    <title>Page introuvable |{APP_NAME}</title>
                </Helmet>
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
        </HelmetProvider>
    );
};

export default Page404;
