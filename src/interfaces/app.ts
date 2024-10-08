export interface IUnknownObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export enum EnumFormContext {
    CREATE = 'CREATE',
    EDIT = 'EDIT',
}

export enum EnumArticleVideoActionContext {
    APPROVE = 'APPROVE',
    DISABLE = 'DISABLE',
    DELETE = 'DELETE',
    FEATURE = 'FEATURE',
    UNFEATURE = 'UNFEATURE',
}

export enum EnumPromotionActionContext {
    ENABLE = 'ENABLE',
    DISABLE = 'DISABLE',
    DELETE = 'DELETE',
}

export enum EnumUserActionContext {
    UNBLOCK = 'UNBLOCK',
    BLOCK = 'BLOCK',
    DELETE = 'DELETE',
}

export enum EnumStatus {
    ALL = 'ALL',
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}
