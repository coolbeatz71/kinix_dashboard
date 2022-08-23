import axios from 'axios';
import { YOUTUBE_API } from '@constants/api';
import { GOOGLE_API_KEY } from '@constants/platform';
import { IYoutubeVideo } from '@interfaces/youtube/youtubeVideo';
import { IYoutubeComment } from '@interfaces/youtube/youtubeComment';
import { ICreateYoutubeComment } from '@interfaces/youtube/createYoutubeComment';

export const getYoutubeVideoInfo = async (videoId: string | null): Promise<IYoutubeVideo> => {
    const part = 'snippet,contentDetails,statistics';
    const url = `${YOUTUBE_API}videos`;

    const { data } = await axios.get(url, {
        params: {
            part,
            id: videoId,
            key: GOOGLE_API_KEY,
        },
    });

    return data;
};

export const getYoutubeVideoComments = async (videoId: string | null): Promise<IYoutubeComment> => {
    const part = 'snippet';
    const url = `${YOUTUBE_API}commentThreads`;

    const { data } = await axios.get(url, {
        params: {
            part,
            videoId,
            maxResults: 100,
            key: GOOGLE_API_KEY,
        },
    });

    return data;
};

export const createYoutubeVideoComment = async (
    videoId: string | null,
    comment: string,
): Promise<ICreateYoutubeComment> => {
    const part = 'snippet';
    const url = `${YOUTUBE_API}commentThreads`;

    const { data } = await axios.post(url, {
        snippet: {
            part,
            videoId,
            topLevelComment: {
                snippet: {
                    textOriginal: comment,
                },
            },
        },
    });

    return data;
};
