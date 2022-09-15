import { Dayjs } from 'dayjs';
import EnumPromotionPlan from '@constants/promotion';

export interface IAdsData {
    id?: number;
    userId: number;
    planId: number;
    legend: string;
    title: string;
    subTitle: string;
    body: string;
    redirectUrl?: string | null;
    image: string | null;
    startDate: Dayjs | string;
}
export interface IStoryData {
    id?: number;
    userId: number;
    planId: number;
    legend: string;
    title: string;
    subTitle: string;
    body: string;
    redirectUrl?: string | null;
    media: string | null;
    mediaType: string | null;
    startDate: string;
}

export interface IAdsPlanData {
    id?: number;
    price: number;
    name: EnumPromotionPlan;
    duration: number;
}
export type IStoryPlanData = IAdsPlanData;

export interface IOverviewObj {
    amount: number;
    total: number;
}
export interface IAdsOverview {
    free: IOverviewObj;
    basic: IOverviewObj;
    premium: IOverviewObj;
    professional: IOverviewObj;
}
