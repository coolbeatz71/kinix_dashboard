import { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LINK, SUCCESS } from '@constants/colors';

import styles from './index.module.scss';

interface IDataItem {
    uv: number;
    pv?: number;
    name: string;
}

export interface IAppBarChartProps {
    width?: number;
    height?: number;
    single?: boolean;
    uvLabel?: string;
    pvLabel?: string;
    uvColor?: string;
    pvColor?: string;
    noYAxis?: boolean;
    data: IDataItem[];
}

const AppBarChart: FC<IAppBarChartProps> = ({
    data,
    width = 500,
    height = 280,
    uvLabel = '',
    pvLabel = '',
    single = false,
    noYAxis = false,
    pvColor = `${LINK}`,
    uvColor = `${SUCCESS}`,
}) => {
    return (
        <BarChart width={width} height={height} data={data} className={styles.chart}>
            {!single && [
                <CartesianGrid key="1" strokeDasharray="3 3" />,
                <XAxis key="2" dataKey="name" />,
                !noYAxis && <YAxis key="3" />,
                <Tooltip key="4" />,
                <Legend key="5" align="center" />,
                <Bar key="6" dataKey="pv" legendType="circle" fill={pvColor} name={pvLabel} />,
            ]}
            <Bar dataKey="uv" legendType="circle" fill={uvColor} name={uvLabel} />
        </BarChart>
    );
};

export default AppBarChart;
