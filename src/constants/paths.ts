import EnumCategory from '@interfaces/category';

export const LOGIN_PATH = '/';
export const DASHBOARD_PATH = '/dashboard';
export const SETTING_PATH = '/settings';
export const VIDEO_PATH = '/videos';
export const ARTICLE_PATH = '/articles';
export const ADS_PATH = '/ads';
export const STORY_PATH = '/story';
export const ADMIN_PATH = '/admins';
export const USER_PATH = '/users';

export const NOT_FOUND_PATH = '/page-introuvable';

export const MUSIC_VIDEO_PATH = `${VIDEO_PATH}/${EnumCategory.MUSIC_VIDEO}`;
export const INTERVIEW_PATH = `${VIDEO_PATH}/${EnumCategory.INTERVIEW}`;
export const PODCAST_PATH = `${VIDEO_PATH}/${EnumCategory.PODCAST}`;
export const LEFOCUS_PATH = `${VIDEO_PATH}/${EnumCategory.LEFOCUS}`;
export const FLEXBEATZ_PATH = `${VIDEO_PATH}/${EnumCategory.FLEXBEATZ}`;
