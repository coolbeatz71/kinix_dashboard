import React, { FC } from 'react';
import { Spin, SpinProps } from 'antd';

const Loading: FC<SpinProps> = ({
    delay,
    indicator,
    size = 'large',
    spinning,
    tip = 'chargement',
    wrapperClassName,
    className,
}) => {
    return (
        <div className={className}>
            <Spin
                tip={tip}
                size={size}
                delay={delay}
                spinning={spinning}
                indicator={indicator}
                wrapperClassName={wrapperClassName}
            />
        </div>
    );
};

export default Loading;
