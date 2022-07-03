import { DeltaOperation } from 'quill';

const getQuillImageUrls = (deltaOps: DeltaOperation[]): string[] => {
    return deltaOps?.filter((i) => i.insert && i.insert.image).map((i) => i.insert.image);
};

export default getQuillImageUrls;
