import EPromotionPlan from '@constants/promotion';
import EnumProvider from './provider';
import EnumRole from './role';

export interface IUser {
    readonly id?: number;
    userName: string;
    password: string;
    email?: string | null;
    phoneNumber?: string | null;
    provider?: EnumProvider;
    isLoggedIn?: boolean;
    verified?: boolean;
    active?: boolean;
    image?: string | null;
    allowEmailNotification?: boolean;
    role?: EnumRole;
    countryName?: string;
    countryFlag?: string;
    phoneISOCode?: string;
    phoneDialCode?: string;
    phonePartial?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IArticle {
    readonly id?: number;
    slug: string;
    title: string;
    summary: string;
    body: string;
    images: string[] | null;
    video: string[] | null;
    reads: number;
    tags: string[] | null;
    active?: boolean;
    liked?: boolean;
    userId: number;
    createdAt?: string;
    updatedAt?: string;
    user?: IUser;
    like?: ILike[];
    comment?: IComment[];
    bookmark?: IBookmark[];
    likesCount?: number;
    commentsCount?: number;
    bookmarksCount?: number;
}

export interface IComment {
    readonly id?: number;
    userId: number;
    articleId: number;
    body: string;
    user?: IUser;
    createdAt?: string;
    updatedAt?: string;
}

export interface IVideo {
    readonly id?: number;
    slug: string;
    link: string;
    title: string;
    tags: string[] | null;
    active?: boolean;
    avgRate?: number;
    totalRaters?: number;
    shared?: boolean;
    userId: number;
    user?: IUser;
    lyrics?: string;
    category?: ICategory;
    share: IShare[];
    rate: IRate[];
    categoryId: number;
    sharesCount?: number;
    playlistsCount?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IBookmark {
    readonly id: number;
    userId: number;
    articleId: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICategory {
    readonly id: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ILike {
    readonly id?: number;
    userId: number;
    articleId: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IPlaylist {
    readonly id?: number;
    slug: string;
    title: string;
    userId: number;
    videoId: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IRate {
    readonly id?: number;
    userId: number | null;
    videoId: number;
    count: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IShare {
    readonly id?: number;
    userId: number | null;
    videoId: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IAds {
    readonly id?: number;
    user?: IUser;
    planId: number;
    slug: string;
    legend: string;
    title: string;
    subTitle: string;
    body: string;
    redirectUrl?: string | null;
    image: string;
    active: boolean;
    startDate: string;
    endDate: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface IStory {
    readonly id?: number;
    user: IUser;
    planId: number;
    slug: string;
    legend: string;
    title: string;
    subTitle: string;
    body: string;
    redirectUrl?: string | null;
    media: string;
    mediaType: string;
    active: boolean;
    startDate: string;
    endDate: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IAdsPlan {
    readonly id?: number;
    name: EPromotionPlan;
    price: number;
    duration: number;
    createdAt?: string;
    updatedAt?: string;
}
export type IStoryPlan = IAdsPlan;
