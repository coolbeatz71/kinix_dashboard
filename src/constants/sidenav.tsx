import React, { ReactNode } from 'react';
import { HiUsers } from 'react-icons/hi';
import { TbNetwork } from 'react-icons/tb';
import { BsFillSpeakerFill } from 'react-icons/bs';
import { FaMicrophoneAlt, FaPodcast } from 'react-icons/fa';
import { VideoCameraFilled, GlobalOutlined } from '@ant-design/icons';
import { RiAdminFill, RiArticleLine, RiFocusLine } from 'react-icons/ri';
import {
    ADMIN_PATH,
    ADS_PATH,
    ARTICLE_PATH,
    FLEXBEATZ_PATH,
    INTERVIEW_PATH,
    LEFOCUS_PATH,
    MUSIC_VIDEO_PATH,
    PODCAST_PATH,
    STORY_PATH,
} from './paths';
import EnumRole from '@interfaces/role';

export interface ISideNavSection {
    icon: ReactNode;
    text: string;
    href?: string;
    role: EnumRole[];
    sub?: ISideNavSection[];
}

export const MAX_SIDENAV_WIDTH = 200;
export const MIN_SIDENAV_WIDTH = 60;

export const ARTICLE_SECTIONS: ISideNavSection[] = [
    {
        icon: <RiArticleLine />,
        text: 'Articles',
        href: ARTICLE_PATH,
        role: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
    },
];

export const PROMO_SECTIONS: ISideNavSection[] = [
    {
        icon: <GlobalOutlined />,
        text: 'Ads',
        href: ADS_PATH,
        role: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
    },
    {
        icon: <TbNetwork />,
        text: 'Story',
        href: STORY_PATH,
        role: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
    },
];

export const VIDEO_SECTIONS: ISideNavSection[] = [
    {
        icon: <VideoCameraFilled />,
        text: 'Clip Videos',
        href: MUSIC_VIDEO_PATH,
        role: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
    },
    {
        icon: <FaMicrophoneAlt />,
        text: 'Interviews',
        href: INTERVIEW_PATH,
        role: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
    },
    {
        icon: <FaPodcast />,
        text: 'Podcasts',
        href: PODCAST_PATH,
        role: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
    },
    {
        icon: <RiFocusLine />,
        text: 'LeFocus',
        href: LEFOCUS_PATH,
        role: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
    },
    {
        icon: <BsFillSpeakerFill />,
        text: 'FlexBeatz',
        href: FLEXBEATZ_PATH,
        role: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
    },
];

export const USER_SECTIONS: ISideNavSection[] = [
    {
        icon: <RiAdminFill />,
        text: 'Administrateurs',
        href: ADMIN_PATH,
        role: [EnumRole.SUPER_ADMIN],
    },
    {
        icon: <HiUsers />,
        text: 'Clients',
        href: '/users',
        role: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
    },
];

export default [
    { key: 'article', title: 'Section articles', sub: ARTICLE_SECTIONS },
    { key: 'video', title: 'Section videos', sub: VIDEO_SECTIONS },
    { key: 'promo', title: 'Section promotion', sub: PROMO_SECTIONS },
    { key: 'user', title: 'Section utilisateurs', sub: USER_SECTIONS },
];
