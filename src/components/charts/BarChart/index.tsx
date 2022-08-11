import React, { FC, ReactElement } from 'react';
import { truncate } from 'lodash';
import { GRAY, LINK } from '@constants/colors';
import { IBarChartDataItem } from '@interfaces/charts';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import { IUnknownObject } from '@interfaces/app';

import styles from './index.module.scss';
export interface IAppBarChartProps {
    width?: number;
    height?: number;
    single?: boolean;
    uvLabel?: string;
    pvLabel?: string;
    uvColor?: string;
    pvColor?: string;
    noYAxis?: boolean;
    data: IBarChartDataItem[];
}

const CustomTooltip = (params: IUnknownObject): ReactElement | null => {
    const { active, payload } = params;

    if (active && payload && payload.length) {
        const value = payload[0].value;
        const desc = truncate(payload[0].payload.desc, { length: 50 });
        return (
            <div data-custom-tooltip>
                <p data-label>Total: {value}</p>
                <p data-desc>{desc}</p>
            </div>
        );
    }

    return null;
};

const AppBarChart: FC<IAppBarChartProps> = ({
    data,
    height = 250,
    uvLabel = '',
    pvLabel = '',
    single = false,
    noYAxis = false,
    pvColor = `${GRAY}`,
    uvColor = `${LINK}`,
}) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} className={styles.chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                {!noYAxis && <YAxis />}
                <Tooltip content={<CustomTooltip />} />
                {!single && [<Bar key="5" dataKey="pv" legendType="square" fill={pvColor} name={pvLabel} />]}
                <Bar dataKey="uv" legendType="square" fill={uvColor} name={uvLabel} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default AppBarChart;
