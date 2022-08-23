export interface ICreateYoutubeComment {
    kind: string;
    etag: string;
    id: string;
    snippet: ISnippet;
}
export interface ISnippet {
    channelId: string;
    videoId: string;
    topLevelComment: ITopLevelComment;
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
}
export interface ITopLevelComment {
    kind: string;
    etag: string;
    id: string;
    snippet: ISnippetOne;
}
export interface ISnippetOne {
    channelId: string;
    videoId: string;
    textDisplay: string;
    textOriginal: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    authorChannelId: IAuthorChannelId;
    canRate: boolean;
    viewerRating: string;
    likeCount: number;
    publishedAt: string;
    updatedAt: string;
}
export interface IAuthorChannelId {
    value: string;
}
