import React, { FC, ReactElement, useState } from 'react';
import numeral from 'numeral';
import { IUnknownObject } from '@interfaces/app';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell, Legend } from 'recharts';
import { LINK } from '@constants/colors';

export interface IDataItem {
    name: string;
    value: number;
    color: string;
}

export interface IShapePieChartProps {
    data: IDataItem[];
    width?: number;
    height?: number;
}

const renderActiveShape = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
}: IUnknownObject): ReactElement => {
    const RADIAN = Math.PI / 180;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;

    const textAnchor = cos >= 0 ? 'start' : 'end';
    const textX = ex + (cos >= 0 ? 1 : -1) * 12;

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                fill={fill}
                endAngle={endAngle}
                startAngle={startAngle}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
            />
            <Sector
                cx={cx}
                cy={cy}
                fill={fill}
                endAngle={endAngle}
                startAngle={startAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={textX} y={ey} textAnchor={textAnchor} fill="#333" strokeWidth="2">{`Total: ${numeral(value).format(
                '0.[00]a',
            )}`}</text>
            <text x={textX} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Pourcentage: ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const ShapePieChart: FC<IShapePieChartProps> = ({ data, width = 400, height = 400 }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const onMouseEnter = (_: React.MouseEvent<Element, MouseEvent>, i: number): void => {
        setActiveIndex(i);
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={width} height={height}>
                <Pie
                    cx="50%"
                    cy="50%"
                    data={data}
                    fill={LINK}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={80}
                    activeIndex={activeIndex}
                    onMouseEnter={onMouseEnter}
                    activeShape={renderActiveShape}
                >
                    {data.map((dt) => (
                        <Cell key={`cell-${dt.name}`} fill={dt.color} />
                    ))}
                </Pie>
                <Legend align="center" iconType="circle" />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default ShapePieChart;
