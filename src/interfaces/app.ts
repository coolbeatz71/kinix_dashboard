export interface IUnknownObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export enum EnumFormContext {
    CREATE = 'CREATE',
    EDIT = 'EDIT',
}

export enum EnumActionContext {
    APPROVE = 'APPROVE',
    DISABLE = 'DISABLE',
    DELETE = 'DELETE',
}
