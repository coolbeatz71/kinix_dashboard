import { IUnknownObject } from '@interfaces/app';
const colors: IUnknownObject = {
    MUSIC_VIDEO: 'rgb(136, 134, 214)',
    INTERVIEW: 'rgb(23, 139, 251)',
    PODCAST: 'rgb(253, 128, 75)',
    LEFOCUS: 'rgb(254, 186, 60)',
    FLEXBEATZ: 'rgb(31, 195, 160)',
};

export const unwrap = (key: string): typeof colors => colors[key]?.replace('rgb(', '').replace(')', '');

export default colors;
