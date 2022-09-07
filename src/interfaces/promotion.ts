import EPromotionPlan from '@constants/promotion';

export interface IAdsData {
    id?: number;
    userId: number;
    planId: number;
    legend: string;
    title: string;
    subTitle: string;
    body: string;
    redirectUrl?: string | null;
    image: string;
    startDate: string;
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
    media: string;
    mediaType: string;
    startDate: string;
}

export interface IAdsPlanData {
    id?: number;
    price: number;
    name: EPromotionPlan;
    duration: number;
}
export type IStoryPlanData = IAdsPlanData;
