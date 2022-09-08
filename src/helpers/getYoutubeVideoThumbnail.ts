const getYoutubeVideoThumbnail = (videoId: string): string => {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

export default getYoutubeVideoThumbnail;
