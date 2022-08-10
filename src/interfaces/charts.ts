export interface IPieChartDataItem {
    name: string;
    value: number;
    color: string;
}

export interface IBarChartDataItem {
    uv: number;
    pv?: number;
    name: string;
}

export enum EnumChartType {
    ROLE = 'ROLE',
    ACTIVITY = 'ACTIVITY',
    PROVIDER = 'PROVIDER',
    NOTIFICATION = 'NOTIFICATION',
}
