import React, { FC } from 'react';
import { DASHBOARD_PATH } from '@constants/paths';

interface ILogoProps {
    canRedirect?: boolean;
    className: string | undefined;
}

const Logo: FC<ILogoProps> = ({ className, canRedirect = false }) =>
    canRedirect ? (
        <a aria-label="kiinox-logo" href={DASHBOARD_PATH}>
            <div className={className} />
        </a>
    ) : (
        <div className={className} />
    );

export default Logo;
