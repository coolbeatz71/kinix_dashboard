import { IUnknownObject } from './app';

export interface IVideoData {
    slug?: string;
    link: string;
    title: string;
    tags?: string[] | null;
    userId: number;
    lyrics?: string;
    categoryId: number | IUnknownObject;
}
