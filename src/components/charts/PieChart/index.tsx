import React, { ReactElement, FC } from 'react';
import { PieChart, Pie, Legend, Cell } from 'recharts';
import { IUnknownObject } from '@interfaces/app';

const RADIAN = Math.PI / 180;

const CustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: IUnknownObject): ReactElement => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export interface DataItem {
    name: string;
    value: number;
    color: string;
}

export interface IAppPieChartProps {
    data: DataItem[];
    width?: number;
    height?: number;
}

const AppPieChart: FC<IAppPieChartProps> = ({ data, width = 200, height = 300 }) => {
    return (
        <PieChart width={width} height={height}>
            <Pie
                data={data}
                cx={width / 2}
                cy={width / 2}
                dataKey="value"
                outerRadius={80}
                fill="#8884d8"
                labelLine={false}
                label={CustomizedLabel}
            >
                {data.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
            </Pie>
            <Legend align="center" iconType="circle" />
        </PieChart>
    );
};

export default AppPieChart;
