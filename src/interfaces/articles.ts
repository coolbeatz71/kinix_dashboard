export interface IArticleData {
    title: string;
    summary: string;
    body?: string;
    images?: string[];
    tags?: string[];
    slug?: string;
}

export enum EnumStatus {
    ALL = 'ALL',
    ACTIVE = 'ACTIF',
    INACTIVE = 'INACTIF',
}
