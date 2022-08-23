import { IUnknownObject } from '@interfaces/app';

export interface IYoutubeVideo {
    kind: string;
    etag: string;
    items?: IItemsEntity[] | null;
    pageInfo: IPageInfo;
}
export interface IItemsEntity {
    kind: string;
    etag: string;
    id: string;
    snippet: ISnippet;
    contentDetails: IContentDetails;
    statistics: IStatistics;
}
export interface ISnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: IThumbnails;
    channelTitle: string;
    categoryId: string;
    liveBroadcastContent: string;
    localized: ILocalized;
    defaultAudioLanguage: string;
}
export interface IThumbnails {
    default: IDefaultOrMediumOrHighOrStandardOrMaxres;
    medium: IDefaultOrMediumOrHighOrStandardOrMaxres;
    high: IDefaultOrMediumOrHighOrStandardOrMaxres;
    standard: IDefaultOrMediumOrHighOrStandardOrMaxres;
    maxres: IDefaultOrMediumOrHighOrStandardOrMaxres;
}
export interface IDefaultOrMediumOrHighOrStandardOrMaxres {
    url: string;
    width: number;
    height: number;
}
export interface ILocalized {
    title: string;
    description: string;
}
export interface IContentDetails {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    contentRating: IUnknownObject;
    projection: string;
}
export interface IStatistics {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
}
export interface IPageInfo {
    totalResults: number;
    resultsPerPage: number;
}
