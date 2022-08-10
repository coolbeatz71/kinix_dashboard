import { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { GRAY, LINK } from '@constants/colors';
import { IBarChartDataItem } from '@interfaces/charts';

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

const AppBarChart: FC<IAppBarChartProps> = ({
    data,
    width = 500,
    height = 280,
    uvLabel = 'en-ligne',
    pvLabel = 'hors-ligne',
    single = false,
    noYAxis = false,
    pvColor = `${GRAY}`,
    uvColor = `${LINK}`,
}) => {
    return (
        <BarChart width={width} height={height} data={data} className={styles.chart}>
            {!single && [
                <CartesianGrid key="1" strokeDasharray="3 3" />,
                <XAxis key="2" dataKey="name" />,
                !noYAxis && <YAxis key="3" />,
                <Tooltip key="4" />,
                <Legend key="5" align="center" />,
                <Bar key="6" dataKey="pv" legendType="square" fill={pvColor} name={pvLabel} />,
            ]}
            <Bar dataKey="uv" legendType="square" fill={uvColor} name={uvLabel} />
        </BarChart>
    );
};

export default AppBarChart;
