import { DeltaOperation } from 'quill';
import { IUnknownObject } from '@interfaces/app';

const getQuillImageUrls = (deltaOps: DeltaOperation[]): IUnknownObject => {
    return deltaOps.filter((i) => i.insert && i.insert.image).map((i) => i.insert.image);
};

export default getQuillImageUrls;
