import React, { ReactNode } from 'react';
import { BsFillSpeakerFill } from 'react-icons/bs';
import { FaMicrophoneAlt, FaPodcast } from 'react-icons/fa';
import { VideoCameraFilled, StarFilled, GlobalOutlined } from '@ant-design/icons';
import { RiArticleLine, RiFocusLine } from 'react-icons/ri';
import { TbNetwork } from 'react-icons/tb';
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
import EnumRole from '@interfaces/userRole';

interface ISideNavSection {
    icon: ReactNode;
    text: string;
    href?: string;
    role: EnumRole[];
    sub?: ISideNavSection[];
}

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
        text: 'Stories',
        href: STORY_PATH,
        role: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
    },
];

export const VIDEO_SECTIONS: ISideNavSection[] = [
    {
        icon: <VideoCameraFilled />,
        text: 'Videos',
        role: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
        sub: [
            {
                icon: <VideoCameraFilled />,
                text: 'Clip Video',
                href: MUSIC_VIDEO_PATH,
                role: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
            },
            {
                icon: <FaMicrophoneAlt />,
                text: 'Interview',
                href: INTERVIEW_PATH,
                role: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
            },
            {
                icon: <FaPodcast />,
                text: 'Podcast',
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
                text: 'Flex&Beatz',
                href: FLEXBEATZ_PATH,
                role: [EnumRole.ADMIN, EnumRole.SUPER_ADMIN],
            },
        ],
    },
];

export const USER_SECTIONS: ISideNavSection[] = [
    {
        icon: <StarFilled />,
        text: 'Admins',
        href: ADMIN_PATH,
        role: [EnumRole.SUPER_ADMIN],
    },
    {
        icon: <StarFilled />,
        text: 'Users',
        href: '/users',
        role: [EnumRole.SUPER_ADMIN],
    },
];

export default [
    { key: 'article', title: 'ARTICLE SECTION', sub: ARTICLE_SECTIONS },
    { key: 'promo', title: 'PROMO SECTION', sub: PROMO_SECTIONS },
    { key: 'video', title: 'VIDEO SECTION', sub: VIDEO_SECTIONS },
    { key: 'user', title: 'USER SECTION', sub: USER_SECTIONS },
];
