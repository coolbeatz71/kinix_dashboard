import { IUnknownObject } from './app';

interface IUsers {
    all: number;
    verified: number;
    unverified: number;
}

interface IArticles {
    all: number;
    liked: number;
    commented: number;
}

interface IVideos {
    all: number;
    rated: number;
    shared: number;
}

interface IPromotions {
    all: number;
    active: number;
    inactive: number;
}

export interface IGeneralOverview {
    users: IUsers;
    articles: IArticles;
    videos: IVideos;
    promotions: IPromotions;
}

interface IUserRole {
    ads: number;
    admin: number;
    video: number;
    viewer: number;
    superAdmin: number;
}

interface IActivity {
    active: number;
    inactive: number;
}
interface IUserProvider {
    local: number;
    google: number;
    facebook: number;
}

interface IArticleLikes {
    liked: number;
    nonLiked: number;
}

interface IArticleTop {
    likes: IUnknownObject[];
    comments: IUnknownObject[];
}

interface IVideoTop {
    shares: IUnknownObject[];
    rates: IUnknownObject[];
}

interface IVideoCategory {
    musicVideos: number;
    interviews: number;
    lefocus: number;
    flexBeatz: number;
    podcasts: number;
}

type IUserNotification = IActivity;

export interface IUserOverview {
    role: IUserRole;
    activity: IActivity;
    provider: IUserProvider;
    notification: IUserNotification;
}

export interface IArticleOverview {
    top: IArticleTop;
    activity: IActivity;
    likes: IArticleLikes;
}

export interface IVideoOverview {
    top: IVideoTop;
    activity: IActivity;
    category: IVideoCategory;
}

export interface IBookmarkedArticle {
    bookmarked: IUnknownObject[];
}

export interface IPlaylistedVideo {
    playlisted: IUnknownObject[];
}
export interface IBookmarkOverview {
    users: number;
    articles: number;
    top: IBookmarkedArticle;
}

export interface IPlaylistOverview {
    users: number;
    videos: number;
    top: IPlaylistedVideo;
}

interface IOverview {
    users: IUserOverview;
    videos: IVideoOverview;
    general: IGeneralOverview;
    articles: IArticleOverview;
    playlists: IPlaylistOverview;
    bookmarks: IBookmarkOverview;
}

export default IOverview;
