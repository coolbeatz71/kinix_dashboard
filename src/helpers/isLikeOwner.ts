import { ILike } from '@interfaces/api';

const isLikeOwner = (userId: number | undefined, likes: ILike[] | []): boolean | undefined => {
    if (likes && userId) {
        const isOwner = likes?.some((like) => like.userId === userId);
        return isOwner;
    }
};

export default isLikeOwner;
