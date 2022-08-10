import { IUnknownObject } from '@interfaces/app';
import { Options } from 'react-lottie';

const getLottieOptions = (animationData: IUnknownObject): Options => ({
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
});

export default getLottieOptions;
