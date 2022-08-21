export enum EnumTabTitle {
    LYRICS = 'LYRICS',
    POPULAR = 'POPULAR',
}

export interface IVideoTab {
    title: EnumTabTitle;
}

const videoTabs: IVideoTab[] = [
    {
        title: EnumTabTitle.POPULAR,
    },
    {
        title: EnumTabTitle.LYRICS,
    },
];

export default videoTabs;
