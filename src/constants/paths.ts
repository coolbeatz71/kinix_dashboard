import EnumCategory from '@interfaces/category';

export const HOME_PATH = '/';
export const VIDEO_PATH = '/videos';
export const ARTICLE_PATH = '/articles';
export const ADS_PATH = '/ads';
export const STORY_PATH = '/stories';
export const ADMIN_PATH = '/admins';
export const USER_PATH = '/users';

export const MUSIC_VIDEO_PATH = `${VIDEO_PATH}?category=${EnumCategory.MUSIC_VIDEO}`;
export const INTERVIEW_PATH = `${VIDEO_PATH}?category=${EnumCategory.INTERVIEW}`;
export const PODCAST_PATH = `${VIDEO_PATH}?category=${EnumCategory.PODCAST}`;
export const LEFOCUS_PATH = `${VIDEO_PATH}?category=${EnumCategory.LEFOCUS}`;
export const FLEXBEATZ_PATH = `${VIDEO_PATH}?category=${EnumCategory.FLEXBEATZ}`;
