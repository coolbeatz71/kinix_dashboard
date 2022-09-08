import React, { FC } from 'react';
import Lottie from 'react-lottie';
import skeleton from '@assets/skeleton_anim.json';
import getLottieOptions from '@helpers/getLottieOptions';

const ScreenSkeleton: FC = () => {
    const lottieOps = getLottieOptions(skeleton);
    return (
        <div className="loadingContainer">
            <Lottie width={480} height={480} options={lottieOps} />;
        </div>
    );
};

export default ScreenSkeleton;
